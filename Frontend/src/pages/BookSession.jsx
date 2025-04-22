import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookSession() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mentorName: '',
    date: '',
    time: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    const token = localStorage.getItem('token');

    if (!token) {
      setError("Please log in first.");
      return;
    }
    console.log("Token being sent:", token);
    console.log("Form data:", formData);

    try {
      const res = await axios.post("http://localhost:5000/api/sessions", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Booking successful:", res.data);
      setSuccess(true);
      setFormData({ mentorName: '', date: '', time: '', message: '' });
      setTimeout(() => navigate("/my-sessions"), 3000);
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  return (
    <div className='min-h-screen pt-16 bg-[radial-gradient(circle_at_center,_#C40AB5,_#060666,_#08042E)] flex flex-col justify-center items-center'>
    <div className="max-w-md mx-auto p-8 mt-4  rounded-2xl border border-black">
      <h2 className="prata-regular text-4xl font-bold mb-4 text-center text-white ">Book a Session...</h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded border border-red-300">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded border border-green-300">
          Booking successful! Redirecting...
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="mentorName"
          placeholder="Mentor's Name . . ."
          value={formData.mentorName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
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
          placeholder="Message(optional). . ."
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
