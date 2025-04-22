import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditMentorProfile() {
  const [mentor, setMentor] = useState(null);
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState("");
  const [available, setAvailable] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/mentors/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setMentor(data);
        setBio(data.bio || "");
        setExpertise(data.expertise.join(", "));
        setAvailable(data.available);
        setProfileImage(data.profileImage || "");
      } catch (err) {
        setMessage("Failed to load mentor profile.");
      }
    };

    fetchProfile();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.put(
        "http://localhost:5000/api/mentors/me",
        {
          bio,
          expertise: expertise.split(",").map((tag) => tag.trim()),
          available,
          profileImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMentor(res.data);
      setMessage("Profile updated successfully ✅");

      // ⏪ Redirect to previous page
      setTimeout(() => {
        navigate(-1); // 👈 go back to previous page
      }, 1000);
    } catch (err) {
      setMessage("Error updating profile. " + (err.response?.data?.message || ""));
    }
  };

  if (!mentor) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen pt-16 bg-[radial-gradient(circle_at_center,_#C40AB5,_#060666,_#08042E)] flex flex-col justify-center items-center">
    <div className="max-w-md mx-auto p-8 mt-4 lg:w-2/6 rounded-2xl border border-black">
      <h2 className="prata-regular text-4xl font-bold mb-4 text-center text-white ">Edit Mentor Profile...</h2>
      {message && <p className="mb-4 text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Bio...</label>
          <textarea
            className="w-full border rounded p-2"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Expertise(comma-separated)...</label>
          <input
            className="w-full border rounded p-2"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Profile Image URL...</label>
          <input
            className="w-full border rounded p-2"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-4"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          <label className="text-gray-300">Available for sessions</label>
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

export default EditMentorProfile;
