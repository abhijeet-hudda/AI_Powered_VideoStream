import { useState, useRef, useEffect } from "react";

import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatMessages from "./ChatMessages";

import { useAskAI } from "../../queries/ai.queries";

function AIChatDrawer({ open, onClose, videoId }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);

  const {
    mutate: askAI,
    isPending,
  } = useAskAI();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isPending]);

  const handleSend = (text = question) => {
    if (!text.trim()) return;

    const currentQuestion = text.trim();

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentQuestion,
      },
    ]);

    askAI(
      {
        videoId,
        question: currentQuestion,
      },
      {
        onSuccess: (response) => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              text:
                response?.answer ||
                response?.response ||
                "No answer received.",
            },
          ]);
        },

        onError: (error) => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              text:
                error?.response?.data?.message ||
                "Something went wrong.",
            },
          ]);
        },
      }
    );

    setQuestion("");
  };

  return (
    <div
      className={`fixed top-14 right-0 h-[calc(100vh-56px)] w-105 bg-white border-l shadow-2xl z-50 transition-transform duration-300 flex flex-col
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4 bg-white">
        <div>
          <h2 className="text-xl font-bold">
            🤖 Ask about this video
          </h2>

          <p className="text-sm text-gray-500">
            AI Powered Assistant
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-2xl hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>

      {/* Body */}

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

        {messages.length === 0 ? (
          <SuggestedQuestions
            onSelect={handleSend}
          />
        ) : (
          <ChatMessages
            messages={messages}
            isPending={isPending}
          />
        )}

        {/* Auto Scroll Target */}

        <div ref={bottomRef} />

      </div>

      {/* Footer */}

      <ChatInput
        value={question}
        onChange={setQuestion}
        onSend={() => handleSend()}
        isLoading={isPending}
      />
    </div>
  );
}

export default AIChatDrawer;