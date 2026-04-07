interface HeaderProps {
  compact?: boolean;
}

export default function Header({ compact }: HeaderProps) {
  return (
    <div className={`flex items-center gap-3 transition-all duration-500 ${compact ? "scale-90" : ""}`}>
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Shortcut</h1>
        <p className="text-sm text-gray-500">AI Apple Shortcuts Creator</p>
      </div>
    </div>
  );
}
