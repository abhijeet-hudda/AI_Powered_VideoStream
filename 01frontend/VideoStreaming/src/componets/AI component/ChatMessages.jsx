import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

function ChatMessages({
  messages,
  isPending,
}) {
  return (
    <div className="flex flex-col gap-4">

      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
        />
      ))}

      {isPending && <TypingIndicator />}

    </div>
  );
}

export default ChatMessages;