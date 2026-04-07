interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-lg mx-auto fade-in-up">
      <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-red-300 text-sm mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="text-red-400 hover:text-red-300 text-sm font-medium underline underline-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
