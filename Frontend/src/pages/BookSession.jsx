import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookSession = ({ mentorId, mentorName }) => {
  const [formData, setFormData] = useState({
    mentorId,
    mentorName,
    date: "",
    time: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in first.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/sessions`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Booking successful:", response.data);
      setSuccess(true);

      // Reset form and redirect
      setFormData({ mentorId, mentorName, date: "", time: "", message: "" });
      setTimeout(() => navigate("/my-sessions"), 3000);

    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  return (
    <div>
      <h3>Book a session with {mentorName}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Add a message for the mentor (optional)"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>Booking successful!</p>}
        <button type="submit">Book Session</button>
      </form>
    </div>
  );
};

export default BookSession;
