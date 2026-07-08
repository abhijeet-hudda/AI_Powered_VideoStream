import { useState } from "react";
import { useAskAI } from "../../queries/ai.queries";

const AskAI = ({ videoId }) => {

    const [question, setQuestion] = useState("");

    const {
        mutate: askAI,
        data,
        isPending,
    } = useAskAI();

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!question.trim()) return;

        askAI({
            videoId,
            question: question.trim(),
        });

    };

    return (

        <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-900 p-5">

            <h2 className="text-xl font-semibold mb-4">
                🤖 Ask AI
            </h2>

            <form
                onSubmit={handleSubmit}
                className="flex gap-3"
            >

                <input
                    type="text"
                    placeholder="Ask anything about this video..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="flex-1 rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 outline-none"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700 disabled:opacity-50"
                >
                    {isPending ? "Thinking..." : "Ask"}
                </button>

            </form>

            {data && (

                <div className="mt-5 rounded-lg bg-zinc-800 p-4">

                    <h3 className="font-semibold mb-2">
                        AI Answer
                    </h3>

                    <p>
                        {data.answer}
                    </p>

                </div>

            )}

        </div>

    );

};

export default AskAI;