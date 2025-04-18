import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";

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
    <div className="min-h-screen bg-gradient-to-b from-[#0c081c] to-[#1a073e] flex flex-col  items-center text-center p-6">
      <div className="mt-32">
      <Title text1={"Available"} text2={"Mentors"} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5 p-6">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="bg-blue-100 p-5 border border-gray-400 rounded-2xl w-full">
            <img src={mentor.profileImage} alt={mentor.name} className="w-32 h-32 rounded-full mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-center mb-3">{mentor.name}</h3>
            <p className="text-sm text-center text-gray-500">{mentor.bio}</p>
            <p className="text-sm text-center text-blue-500 mt-1">{mentor.expertise.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentorList;
