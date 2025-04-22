import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditStudentProfile() {
  const [name, setName] = useState(""); // ✅ New name field
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setName(res.data.user?.name || "");
        setBio(data.bio || "");
        setSkills(data.skills?.join(", ") || "");
        setProfilePicture(data.profilePicture || "");
      } catch (err) {
        setMessage("Failed to load student profile.");
      }
    };

    fetchProfile();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5000/api/students/me",
        {
          name, // ✅ send name
          bio,
          skills: skills.split(",").map((s) => s.trim()),
          profilePicture,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Profile updated ✅");
      setTimeout(() => navigate("/student-profile"), 1000);
    } catch (err) {
      setMessage("Error updating profile.");
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-[radial-gradient(circle_at_center,_#C40AB5,_#060666,_#08042E)] flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto p-8 mt-4 lg:w-2/6 rounded-2xl border border-black">
        <h2 className="prata-regular text-4xl font-bold mb-4 text-center text-white">Edit Student Profile...</h2>
        {message && <p className="mb-4 text-blue-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Name...</label>
            <input
              className="w-full border rounded p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Bio...</label>
            <textarea
              className="w-full border rounded p-2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Skills(comma-separated)...</label>
            <input
              className="w-full border rounded p-2"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Profile Picture URL...</label>
            <input
              className="w-full border rounded p-2"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudentProfile;
