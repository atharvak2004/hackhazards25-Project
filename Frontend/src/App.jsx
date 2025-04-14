import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentors" element={<MentorList />} />
        <Route path="/book" element={<BookSession />} />
        <Route path="/feedback" element={<SessionFeedback />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/my-sessions" element={<MySessions />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/register" element={<Signup />} /> 
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;
