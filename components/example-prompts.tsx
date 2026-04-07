import { EXAMPLES } from "@/lib/constants/examples";

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

export default function ExamplePrompts({ onSelect }: ExamplePromptsProps) {
  return (
    <div className="mt-6 w-full max-w-xl">
      <p className="text-xs text-gray-600 mb-3 text-center">Try an example:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            onClick={() => onSelect(ex.prompt)}
            className="text-xs px-3.5 py-2 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-300 transition-all"
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}
