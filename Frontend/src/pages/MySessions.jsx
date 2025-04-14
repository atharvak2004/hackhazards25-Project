import { useEffect, useState } from "react";
import axios from "axios";


const MySessions = () => {
 
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMySessions = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:5000/api/sessions/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSessions(res.data);
      } catch (err) {
        console.error("Error fetching my sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMySessions();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-lg mb-2">
        {user.role === "mentor" ? "Sessions booked with you" : "Your booked sessions"}
      </h3>

      {loading ? (
        <p>Loading your sessions...</p>
      ) : sessions.length === 0 ? (
        <p>You haven't booked any sessions yet.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((s) => (
            <div key={s._id} className="bg-white shadow p-4 rounded">
              <p><strong>Mentor:</strong> {s.mentorName}</p>
              <p><strong>Date:</strong> {s.date}</p>
              <p><strong>Time:</strong> {s.time}</p>
              {s.message && <p><strong>Message:</strong> {s.message}</p>}
              <p className="text-sm text-gray-500">
                Booked at: {new Date(s.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySessions;
