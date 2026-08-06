function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
}) {
  return (
    <div className="border-t p-4">

      <div className="flex gap-2">

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
          placeholder="Ask anything..."
          className="flex-1 rounded-full border px-4 py-3 outline-none"
        />

        <button
          disabled={isLoading}
          onClick={onSend}
          className="rounded-full bg-black text-white px-5 disabled:opacity-50"
        >
          {isLoading ? "..." : "➜"}
        </button>

      </div>

    </div>
  );
}

export default ChatInput;