import React, { useEffect, useState } from "react";
import axios from "axios";

function CircleChat({ circle, onBack }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      if (!circle?._id) return;
      const res = await axios.get(
        `http://localhost:5000/api/circles/${circle._id}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(res.data);
    };
    fetchMessages();
  }, [circle]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!circle?._id) return;
    const res = await axios.post(
      `http://localhost:5000/api/circles/${circle._id}/messages`,
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setMessages((prev) => [...prev, res.data]);
    setContent("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 text-white">
      <button onClick={onBack} className="text-blue-400 mb-4 hover:underline">
        ← Back to Circles
      </button>

      <h2 className="text-2xl font-bold mb-4">🗨️ {circle.name} Chat</h2>
      <p className="text-sm text-gray-400">
        Invite link: <code>{`${window.location.origin}/circles/join/${circle._id}`}</code>
      </p>
      <button
  onClick={() => {
    navigator.clipboard.writeText(`${window.location.origin}/circles/join/${circle._id}`);
    alert("Link copied!");
  }}
  className="text-xs text-blue-500 underline mt-1"
>
  Copy Invite Link
</button>

      <div className="bg-white text-black p-4 rounded h-[400px] overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2">
            <strong>{msg.sender.name}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 p-2 rounded text-black"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-700">
          Send
        </button>
      </form>
    </div>
  );
}

export default CircleChat;
