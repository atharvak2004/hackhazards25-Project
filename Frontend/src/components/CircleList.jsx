import React from "react";

// ✅ No need to import axios if it's unused

function CircleList({ circles, onCreateClick, onOpenChat }) {
  if (!circles.length) return <p>No circles yet. Create or join one!</p>;

  return (
    <div>
      <button
        onClick={onCreateClick}
        className="mb-4 bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
      >
        + Create Circle
      </button>

      <ul className="space-y-4">
        {circles.map((circle) => (
          <li key={circle._id} className="bg-white text-black p-4 rounded shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{circle.name}</h3>
                <p className="text-sm text-gray-600">
                  Members: {circle.members?.length || 0}
                </p>
              </div>
              <button
                className="text-indigo-600 hover:underline"
                onClick={() => onOpenChat(circle)}
              >
                Open Chat →
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CircleList;
