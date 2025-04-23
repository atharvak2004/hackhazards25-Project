import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function BookSession() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mentorId: '',
    mentorName: '',
    date: '',
    time: '',
    message: ''
  });
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem('token');

  // Fetch mentor list
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/mentors`);
        if (res.data && res.data.length > 0) {
          setMentors(res.data);
        } else {
          setError('No mentors available.');
        }
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError('Failed to fetch mentors. Please try again.');
      }
    };
    fetchMentors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    console.log("FORM SUBMIT DEBUG:", {
      mentorId: formData.mentorId,
      mentorName: formData.mentorName
    });
    

    // Basic validation
    if (!formData.mentorId || !formData.date || !formData.time) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!token) {
      setError("Please log in first.");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/sessions`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Booking successful:", res.data);
      setSuccess(true);
      setFormData({
        mentorId: '',
        mentorName: '',
        date: '',
        time: '',
        message: ''
      });

      setTimeout(() => navigate("/my-sessions"), 2000);
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  return (
    <div className='min-h-screen pt-16 bg-[radial-gradient(circle_at_center,_#C40AB5,_#060666,_#08042E)] flex flex-col justify-center items-center'>
      <div className="max-w-md mx-auto p-8 mt-4 rounded-2xl border border-black bg-white">
        <h2 className="text-4xl font-bold mb-4 text-center text-black">Book a Session</h2>

        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded border border-red-300">{error}</div>}
        {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded border border-green-300">Booking successful! Redirecting...</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="mentorId"
            value={formData.mentorId}
            onChange={(e) => {
              const selectedMentor = mentors.find(m => m._id === e.target.value);
              setFormData((prev) => ({
                ...prev,
                mentorId: selectedMentor?._id || '',
                mentorName: selectedMentor?.name || ''
              }));
            }}
            required
          >
            <option value="">Select a mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="message"
            placeholder="Message (optional)..."
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
          />
          <div className='flex justify-center'>
            <button
              type="submit"
              className="w-7/12 bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
            >
              Book Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookSession;
