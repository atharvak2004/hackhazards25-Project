import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

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
        <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">My Mentor Profile</h2>
            <img
                src={mentor.profileImage}
                alt={mentor.name}
                className="w-24 h-24 rounded-full mb-3 mx-auto"
            />
            <h3 className="text-lg font-semibold text-center">{mentor.name}</h3>
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
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Edit Profile
                </Link>
            </div>
        </div>
    );
}

export default MyMentorProfile;
