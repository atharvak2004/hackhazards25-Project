import React, { useEffect, useState } from "react";
import axios from "axios";

function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sessions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSessions(res.data);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [token]);

  const getJitsiLink = (session) => {
    const name = session.mentorName.replace(/\s+/g, "");
    const room = `${name}-${session.date}-${session.time}`.replace(/[:]/g, "");
    return `https://meet.jit.si/${room}`;
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Sessions</h2>

      {loading ? (
        <p>Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="border rounded p-4 shadow bg-white space-y-2"
            >
              <div className="text-lg font-semibold text-gray-800">
                {session.mentorName}
              </div>
              <div className="text-sm text-gray-600">
                📅 {session.date} | ⏰ {session.time}
              </div>
              <div className="text-sm text-gray-700">{session.message}</div>

              {/* ✅ Show Join button only if the session is in the future */}
              {new Date(`${session.date}T${session.time}`) > new Date() && (
                <a
                  href={getJitsiLink(session)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  🎥 Join Session
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySessions;
  