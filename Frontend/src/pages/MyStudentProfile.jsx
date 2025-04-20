import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Title from "../components/Title";

function MyStudentProfile() {
    const [student, setStudent] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/students/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStudent(res.data);
            } catch (err) {
                setError("Failed to load student profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, []);

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0c081c] to-[#1a073e] flex flex-col items-center text-center p-6 text-white">
            <div className="mt-32 mb-10">
                <Title text1="My" text2="Profile" />
            </div>
            <div className="p-6 max-w-xl bg-blue-100 text-black rounded-xl shadow">
                <h2 className="text-3xl font-bold mb-4">My Student Profile</h2>
                <img
                    src={student.profilePicture}
                    alt={student.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />

                <h3 className="text-2xl font-semibold mb-3">
                    {student.user?.name || "Unnamed Student"}
                </h3>
                <p className="text-sm text-gray-500 m   b-2">
                    Email: {student.user?.email}
                </p>

                <p className="text-gray-700 mb-2">{student.bio}</p>
                <p className="text-sm text-blue-600 mb-2">Skills: {student.skills?.join(", ")}</p>
                <div className="mt-6">
                    <Link
                        to="/student/edit"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MyStudentProfile;
