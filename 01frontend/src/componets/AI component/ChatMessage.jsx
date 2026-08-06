function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm wrap-break-words ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

export default ChatMessage;