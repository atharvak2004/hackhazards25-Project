import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/sessions/mine`, {
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
    <div className="p-6 min-h-screen bg-gradient-to-b from-[#0c081c] to-[#1a073e] flex flex-col items-center ">
      <div className="mt-32 mb-10">
        <Title text1={"My"} text2={"Sessions"} />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-gray-500">No sessions found.</p>
      ) : (
        <div className="w-full max-w-xl space-y-4 px-4 text-center">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="border rounded-xl p-5 shadow bg-blue-100 space-y-3"
            >
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {(user?.role === "mentor" && session.userName) ||
                  (user?.role === "student" && session.mentorName) ||
                  "Unknown Participant"}
              </div>

              <div className="text-md text-gray-600 mb-1">
                <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                {session.date} | &nbsp;
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                {session.time}
              </div>
              <div className="text-sm text-gray-700">{session.message}</div>

              {new Date(`${session.date}T${session.time}`) > new Date() && (
                <a
                  href={getJitsiLink(session)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-lime-600 text-white rounded-xl hover:bg-green-700 border-2 border-gray-500"
                >
                  Join Session
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
