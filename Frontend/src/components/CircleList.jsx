import React from "react";

function CircleList({ circles, onCreateClick, onOpenChat }) {
  if (!circles.length) {
    return (
      <p className="text-center text-xl text-gray-500">
        No circles yet. Create or join one to get started!
      </p>
    );
  }

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
          <li key={circle._id} className="bg-blue-100 text-black p-4 rounded shadow">
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
