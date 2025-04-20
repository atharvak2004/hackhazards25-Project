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
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Student Profile</h2>
      {message && <p className="mb-4 text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            className="w-full border rounded p-2"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Skills (comma-separated)</label>
          <input
            className="w-full border rounded p-2"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Profile Picture URL</label>
          <input
            className="w-full border rounded p-2"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </div>
        {profilePicture && (
          <img
            src={profilePicture}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-full mt-2"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditStudentProfile;
