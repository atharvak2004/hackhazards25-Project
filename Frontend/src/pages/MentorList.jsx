import { useEffect, useState } from "react";
import axios from "axios";

function MentorList() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/mentors");
        setMentors(res.data);
      } catch (err) {
        console.error("Error fetching mentors:", err);
      }
    };

    fetchMentors();
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Mentors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="bg-white p-4 rounded shadow">
            <img src={mentor.profileImage} alt={mentor.name} className="w-24 h-24 rounded-full mx-auto mb-2" />
            <h3 className="text-lg font-bold text-center">{mentor.name}</h3>
            <p className="text-sm text-center text-gray-600">{mentor.bio}</p>
            <p className="text-sm text-center text-blue-500 mt-1">{mentor.expertise.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentorList;
