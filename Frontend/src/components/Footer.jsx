import React from 'react';
import { Link } from 'react-router-dom'; // remove this line if you're not using react-router

function Footer() {
  return (
    <>
      <div className="w-full bg-white border-t z-50 px-6 sm:px-10 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 text-sm">
          <div>
            <p className="text-xl font-medium mb-5">Skillora.io</p>
            <p className="text-gray-600">
              Skillora.io is a real-time mentorship and learning platform connecting students with expert mentors. It features session booking, skill trend tracking, and community-based peer Circles. With public and private chat spaces, role-based access, and profile management, it fosters collaborative growth, skill discovery, and meaningful mentor-student interactions.
            </p>
          </div>

          <div>
            <p className="text-xl font-medium mb-5">Dive Deeper...!</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xl font-medium mb-5">We're All Ears!</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>Team EvoCoders</li>
              <li>------------------</li>
              <li>Members:</li>
              <li> - Atharva Kadam</li>
              <li> - Divya .</li>
              <li> - Mansha Pandey</li>
              <li> - Shivansh Goel</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border-t">
        <p className="py-5 text-sm text-center text-gray-600">
          © 2025 Skillora.io - All Rights Reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
