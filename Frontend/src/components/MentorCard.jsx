import React from 'react';
import { Link } from "react-router-dom";


function MentorCard({ name, expertise, bio, available, profileImage }) {
    return (
        <div className="bg-white shadow-md rounded p-5 flex flex-col items-center text-center">
            <img
                src={profileImage}
                alt={name}
                className="w-32 h-32 rounded-full mb-3"
            />
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="text-sm text-gray-600">{bio}</p>
            <div className="mt-2 text-xs text-blue-600">
                {expertise.join(", ")}
            </div>
            {!available && (
                <p className="text-red-500 text-sm mt-1">Currently unavailable</p>
            )}
            <Link className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" to={`/book`} state={{ mentorName: name }}>
                Book Now
            </Link>
        </div>
    );
}

export default MentorCard;
