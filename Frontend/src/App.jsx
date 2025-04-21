import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import MentorList from "./pages/MentorList";
import BookSession from "./pages/BookSession";
import SessionFeedback from "./pages/SessionFeedback";
import Trends from "./pages/Trends";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MySessions from "./pages/MySessions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyMentorProfile from "./pages/MyMentorProfile";
import EditMentorProfile from "./pages/EditMentorProfile";
import MyStudentProfile from "./pages/MyStudentProfile";
import EditStudentProfile from "./pages/EditStudentProfile";
import Circles from "./pages/Circles";





function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentors" element={<MentorList />} />
        <Route
          path="/book"
          element={user?.role === "student" ? <BookSession /> : <Navigate to="/" replace />}
        />
        <Route path="/feedback" element={<SessionFeedback />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/my-sessions" element={<MySessions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mentor-profile" element={<MyMentorProfile />} />
        <Route path="/mentor/edit" element={<EditMentorProfile />} />
        <Route path="/student-profile" element={<MyStudentProfile />} />
        <Route path="/student/edit" element={<EditStudentProfile />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/circles" element={<Circles />} />


      </Routes>
      <Footer />
    </>
  );
}

export default App;
