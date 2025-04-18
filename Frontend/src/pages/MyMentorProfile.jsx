import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Title from "../components/Title";

function MyMentorProfile() {
    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMentorProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("You must be logged in to view your mentor profile.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/mentors/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMentor(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch mentor profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchMentorProfile();
    }, []);

    if (loading) {
        return <div className="p-6">Loading mentor profile...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-600">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0c081c] to-[#1a073e] flex flex-col  items-center text-center p-6">
            <div className="mt-32 mb-10">
                <Title text1={"My"} text2={"Profile"} />
            </div>
        <div className="p-6 max-w-xl mx-auto bg-blue-100 rounded-xl shadow">
            <h2 className="text-3xl font-bold mb-4">My Mentor Profile</h2>
            <img
                src={mentor.profileImage}
                alt={mentor.name}
                className="w-32 h-32 rounded-full mb-3 mx-auto"
            />
            <h3 className="text-2xl font-semibold text-center mb-5">{mentor.name}</h3>
            <p className="text-center text-gray-600 mb-2">{mentor.bio}</p>
            <p className="text-sm text-center text-blue-500 mb-2">
                Expertise: {mentor.expertise.join(", ")}
            </p>
            <p className="text-sm text-center">
                Status:{" "}
                <span className={mentor.available ? "text-green-600" : "text-red-500"}>
                    {mentor.available ? "Available" : "Unavailable"}
                </span>
            </p>
            <div className="mt-6 text-center">
                <Link
                    to="/mentor/edit"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                    Edit Profile
                </Link>
            </div>
        </div>
        </div>
    );
}

export default MyMentorProfile;
