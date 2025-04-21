import React, { useState } from "react";
import axios from "axios";
import { XCircle } from "lucide-react";

const JoinCircle = ({ onJoined }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const handleJoin = async () => {
        setError(""); // clear old errors
        let id = inputValue.trim();

        // Extract just the ID if user pasted a full link
        try {
            if (id.includes("http")) {
                const parts = id.split("/");
                id = parts[parts.length - 1]; // gets "6804cbaf3324ad991d92906f"
            }

            const res = await axios.post(
                `/api/circles/${id}/join`,
                {}, // No body needed
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
            console.log("Joining circle with ID:", id);
            console.log("Request URL:", `/api/circles/${id}/join`);

            if (res.status === 200) {
                onJoined(); // refresh circle list or open chat
            }
        } catch (err) {
            console.error(err);
            setError("❌ Failed to join. Check the Circle ID.");
        }
    };

    return (
        <div className="my-6 max-w-md mx-auto text-white">
            <h2 className="text-lg font-semibold mb-2">Join a Circle</h2>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter Circle ID or Invite Link"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 px-3 py-2 rounded bg-white text-black"
                />
                <button
                    onClick={handleJoin}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
                >
                    Join
                </button>
            </div>
            {error && (
                <div className="text-red-400 mt-2 flex items-center gap-2">
                    <XCircle size={18} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default JoinCircle;
