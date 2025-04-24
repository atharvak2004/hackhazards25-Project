import React, { useState } from "react";
import Title from "../components/Title";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-32 px-4 sm:px-6 bg-gradient-to-b from-[#0c081c] to-[#1a073e] text-white">
      <div className="max-w-3xl mx-auto text-center">
        <Title text1="Contact" text2="Us" />
        <p className="text-gray-300 mt-4 mb-8">
          Have questions, suggestions, or just want to say hi? We'd love to hear from you.
        </p>

        {submitted ? (
          <p className="text-green-400 text-lg">✅ Message sent successfully. Thank you!</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 px-4 py-6 sm:px-0 flex flex-col items-center"
          >
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full sm:w-2/3 p-3 rounded-xl bg-white text-black border border-white placeholder-gray-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full sm:w-2/3 p-3 rounded-xl bg-white text-black border border-white placeholder-gray-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full sm:w-2/3 p-3 rounded-xl bg-white text-black border border-white placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
