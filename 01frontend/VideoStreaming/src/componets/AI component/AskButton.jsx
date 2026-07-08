function AskButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 font-medium text-sm transition-colors flex items-center gap-2"
    >
      ✨ Ask AI
    </button>
  );
}

export default AskButton;