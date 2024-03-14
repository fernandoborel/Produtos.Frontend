"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Principal from "./pages/Principal";

export default function Home() {
  return (
    <Router>
      <div className="row">
        <div className="col-md-12">
          <Navbar />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </Router>
  );
}
