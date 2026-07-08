function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 rounded-2xl px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <span
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
          ></span>

          <span
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>

          <span
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;