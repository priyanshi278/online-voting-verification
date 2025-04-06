import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import VerifyPage from "./VerifyPage"; // ✅ Use correct name

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyPage />} /> {/* ✅ Correct name here too */}
      </Routes>
    </Router>
  );
}

export default App;
