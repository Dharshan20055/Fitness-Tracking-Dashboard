import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/Layout.css";
import "./styles/UIComponents.css";

import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Schedule from "./pages/Schedule";
import Progress from "./pages/Progress";
import Diet from "./pages/Diet";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </>
  );
}

export default App;