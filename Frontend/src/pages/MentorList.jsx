import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";

// Use the API_BASE_URL from the environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; // Fallback to localhost if not found

function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(""); // Add error state

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/mentors`); // Use API base URL here
        setMentors(res.data);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError("Failed to load mentors. Please try again later."); // Show user-friendly error
      } finally {
        setLoading(false); // Stop loading when request completes
      }
    };

    fetchMentors();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading mentors...</div>; // Display loading message
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>; // Display error message
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c081c] to-[#1a073e] flex flex-col items-center text-center p-6">
      <div className="mt-32">
        <Title text1={"Available"} text2={"Mentors"} />
      </div>

      {mentors.length === 0 ? (
        <p className="text-white">No mentors available at the moment.</p> // Handle empty state
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5 p-6">
          {mentors.map((mentor) => (
            <div key={mentor._id} className="bg-blue-100 p-5 border border-gray-400 rounded-2xl w-full">
              <img
                src={mentor.profileImage}
                alt={mentor.name}
                className="w-32 h-32 rounded-full mx-auto mb-3"
              />
              <h3 className="text-3xl font-bold text-center mb-3">{mentor.name}</h3>
              <p className="text-sm text-center text-gray-500">{mentor.bio}</p>
              <p className="text-sm text-center text-blue-500 mt-1">{mentor.expertise.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MentorList;
