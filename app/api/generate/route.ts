import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt } from "@/lib/prompt";
import { compileShortcut, validateShortcutJSON } from "@/lib/compiler";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Models to try in order (fallback on overload)
const MODELS = [
  "claude-sonnet-4-20250514",
  "claude-haiku-4-5-20251001",
];

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2000;

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// SSE helper: sends a typed event to the stream
function sendEvent(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
  type: string,
  data: unknown
) {
  controller.enqueue(
    encoder.encode(`data: ${JSON.stringify({ type, ...data as object })}\n\n`)
  );
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const { prompt } = await request.json();

        if (!prompt || typeof prompt !== "string") {
          sendEvent(controller, encoder, "error", { message: "Missing prompt" });
          controller.close();
          return;
        }

        // Stage 1: Thinking
        sendEvent(controller, encoder, "stage", { stage: "thinking", message: "Understanding your request..." });

        // Try models with retry logic
        let fullText = "";
        let lastError: Error | null = null;

        for (const model of MODELS) {
          for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            try {
              fullText = "";

              if (attempt > 0 || model !== MODELS[0]) {
                const label = model === MODELS[0] ? `Retry ${attempt}...` : `Switching to ${model.split("-").slice(0, 2).join(" ")}...`;
                sendEvent(controller, encoder, "stage", { stage: "generating", message: label });
                await delay(RETRY_DELAY_MS);
              }

              sendEvent(controller, encoder, "stage", { stage: "generating", message: "Generating shortcut actions..." });

              const apiStream = anthropic.messages.stream({
                model,
                max_tokens: 4096,
                system: getSystemPrompt(),
                messages: [{ role: "user", content: prompt }],
              });

              // Stream tokens for progress
              let tokenCount = 0;
              for await (const event of apiStream) {
                if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
                  fullText += event.delta.text;
                  tokenCount++;

                  if (tokenCount % 10 === 0) {
                    sendEvent(controller, encoder, "progress", { tokens: tokenCount });
                  }

                  // Extract partial actions for live preview
                  try {
                    const partialMatch = fullText.match(/"actions"\s*:\s*\[/);
                    if (partialMatch) {
                      const actionsStart = fullText.indexOf('"actions"');
                      if (actionsStart !== -1) {
                        const bracketStart = fullText.indexOf("[", actionsStart);
                        if (bracketStart !== -1) {
                          const partial = fullText.slice(bracketStart);
                          const actions = extractCompleteActions(partial);
                          if (actions.length > 0) {
                            sendEvent(controller, encoder, "partial_actions", {
                              actions,
                              count: actions.length,
                            });
                          }
                        }
                      }
                    }
                  } catch {
                    // Partial parsing is best-effort
                  }
                }
              }

              // Success — break out of both loops
              lastError = null;
              break;
            } catch (err) {
              lastError = err instanceof Error ? err : new Error(String(err));
              const isOverloaded = lastError.message.includes("overloaded") || lastError.message.includes("529");
              const isRateLimit = lastError.message.includes("rate") || lastError.message.includes("429");

              if (!isOverloaded && !isRateLimit) {
                // Non-retryable error, bail immediately
                throw lastError;
              }

              console.warn(`API ${model} attempt ${attempt + 1} failed: ${lastError.message}`);
            }
          }

          if (!lastError) break; // Success, stop trying models
        }

        if (lastError) {
          sendEvent(controller, encoder, "error", {
            message: "AI service is busy. Please try again in a moment.",
          });
          controller.close();
          return;
        }

        // Stage 3: Compiling
        sendEvent(controller, encoder, "stage", { stage: "compiling", message: "Compiling .shortcut file..." });

        // Clean up the response
        let jsonText = fullText.trim();
        if (jsonText.startsWith("```")) {
          jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
        }

        // Parse JSON
        let parsed: unknown;
        try {
          parsed = JSON.parse(jsonText);
        } catch {
          sendEvent(controller, encoder, "error", {
            message: "Failed to parse AI response",
            raw: jsonText.slice(0, 500),
          });
          controller.close();
          return;
        }

        // Validate
        const validation = validateShortcutJSON(parsed);
        if (!validation.valid || !validation.data) {
          sendEvent(controller, encoder, "error", {
            message: `Invalid shortcut: ${validation.error}`,
          });
          controller.close();
          return;
        }

        // Compile to .shortcut plist
        const shortcutBuffer = compileShortcut(validation.data);

        // Stage 4: Done!
        sendEvent(controller, encoder, "complete", {
          name: validation.data.name,
          actions: validation.data.actions,
          file: shortcutBuffer.toString("base64"),
        });

        controller.close();
      } catch (error) {
        console.error("Generation error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        sendEvent(controller, encoder, "error", { message });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// Extract complete JSON action objects from a partial array string
function extractCompleteActions(partial: string): unknown[] {
  const actions: unknown[] = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < partial.length; i++) {
    const char = partial[i];
    if (char === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (char === "}") {
      depth--;
      if (depth === 0 && start !== -1) {
        try {
          const obj = JSON.parse(partial.slice(start, i + 1));
          if (obj.action) actions.push(obj);
        } catch {
          // Incomplete JSON, skip
        }
        start = -1;
      }
    }
  }

  return actions;
}
