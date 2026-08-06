const questions = [
  "Summarize this video",
  "What are the key points?",
  "Explain this in simple words",
  "Generate interview questions",
  "Generate quiz",
];

function SuggestedQuestions({ onSelect }) {
  return (
    <div>

      <h3 className="text-lg font-semibold mb-4">
        Suggested Questions
      </h3>

      <div className="flex flex-col gap-3">

        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onSelect(question)}
            className="text-left border rounded-xl px-4 py-3 hover:bg-gray-100 transition"
          >
            {question}
          </button>
        ))}

      </div>

    </div>
  );
}

export default SuggestedQuestions;