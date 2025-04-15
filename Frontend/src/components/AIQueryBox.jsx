import React, { useState } from "react";
import axios from "axios";

function AIQueryBox() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Stores last 5 Q&A

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/mentor-assist", {
        prompt: query,
      });

      const aiReply = res.data.reply;

      // Limit to last 5 messages
      const updatedHistory = [
        { question: query, answer: aiReply },
        ...chatHistory.slice(0, 4),
      ];

      setChatHistory(updatedHistory);
      setQuery("");
    } catch (err) {
      setChatHistory([
        { question: query, answer: "Failed to fetch AI response." },
        ...chatHistory.slice(0, 4),
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Ask the AI for Feedback Help 💬</h2>

      <input
        type="text"
        className="w-full border p-2 rounded mb-2"
        placeholder="e.g. How can I improve my sessions?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAsk()}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      <div className="mb-4 space-y-3">
        {chatHistory.map((entry, index) => (
          <div key={index} className="border rounded p-3 bg-gray-50">
            <p className="font-semibold text-gray-800">🧑‍🎓 You: {entry.question}</p>
            <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
              🤖 {entry.answer}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AIQueryBox;
