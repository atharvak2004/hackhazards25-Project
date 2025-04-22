import React, { useState, useEffect } from "react";
import axios from "axios";
import CircleList from "../components/CircleList";
import CreateCircleForm from "../components/CreateCircleForm";
import CircleChat from "../components/CircleChat";
import JoinCircle from "../components/JoinCircle";
import Title from "../components/Title";

// ✅ Optional: If using PublicCircles later
// import PublicCircles from "../components/PublicCircles";

// ✅ Dynamic API base URL for dev/prod
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Circles() {
  const [view, setView] = useState("list");
  const [activeCircle, setActiveCircle] = useState(null);
  const [circles, setCircles] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCircles = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/circles/mine`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCircles(res.data);
    } catch (err) {
      console.error("Failed to fetch circles:", err);
    }
  };

  useEffect(() => {
    fetchCircles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c081c] to-[#1a073e] p-6 ">
      <div className="mt-32 flex flex-col justify-center items-center text-center">
        <Title text1={"Circles"} />
      </div>

      {view === "list" && (
        <>
          <JoinCircle onJoined={fetchCircles} />
          <CircleList
            circles={circles}
            onCreateClick={() => setView("create")}
            onOpenChat={(circle) => {
              setActiveCircle(circle);
              setView("chat");
            }}
          />
        </>
      )}

      {view === "create" && (
        <CreateCircleForm
          onCreated={() => {
            fetchCircles();
            setActiveCircle(null);
            setView("list");
          }}
        />
      )}

      {view === "chat" && activeCircle && (
        <CircleChat circle={activeCircle} onBack={() => setView("list")} />
      )}

      {/* Future: Enable this if you add global/public circles */}
      {/* <PublicCircles onOpen={(circle) => {
        setActiveCircle(circle);
        setView("chat");
      }} /> */}
    </div>
  );
}

export default Circles;
