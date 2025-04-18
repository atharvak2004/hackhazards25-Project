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
    <div className="bg-blue-100 p-6 rounded-xl max-w-4xl mx-auto mt-10 w-full border border-black">
      <h2 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed mb-4 ">Ask the AI for Help</h2>
      <input
        type="text"
        className="w-full border p-2 rounded mb-2"
        placeholder="e.g. How can I improve in Frontend...?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAsk()}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-4/12 mt-5  "
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      <div className="mb-4 space-y-3 mt-20">
        {chatHistory.map((entry, index) => (
          <div key={index} className="border rounded-2xl p-6 bg-white">
            <p className="font-semibold text-gray-800">You: {entry.question}</p>
            <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">
               {entry.answer}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AIQueryBox;
