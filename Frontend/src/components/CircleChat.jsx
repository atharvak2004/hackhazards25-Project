import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function CircleChat({ circle, onBack }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      if (!circle?._id) return;
      setLoadingMessages(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/circles/${circle._id}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Failed to fetch messages. Please try again.");
        console.error("Error fetching messages:", error);
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
  }, [circle, token]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!circle?._id || !content.trim()) return;
    setLoading(true);
  
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/circles/${circle._id}/messages`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, res.data]);
      setContent("");
      setErrorMessage(""); 
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 text-white">
      <button onClick={onBack} className="text-blue-400 mb-4 hover:underline">
        ← Back to Circles
      </button>

      <h2 className="text-2xl font-bold mb-4">🔨 {circle.name} Chat</h2>
      <p className="text-sm text-gray-400">
        Invite link: <code>{`https://skillora-two.vercel.app/circles/join/${circle._id}`}</code>
      </p>
      <button
        onClick={() => {
          navigator.clipboard.writeText(`https://skillora-two.vercel.app/circles/join/${circle._id}`);
          alert("Link copied!");
        }}
        className="text-xs text-blue-500 underline mt-1"
      >
        Copy Invite Link
      </button>

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      <div className="bg-white text-black p-4 rounded h-[400px] overflow-y-auto mb-4">
        {loadingMessages ? (
          <p className="text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500">No messages yet. Be the first to message!</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.sender.name}:</strong> {msg.content}
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 p-2 rounded text-black"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default CircleChat;