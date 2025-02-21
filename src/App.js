import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Homepage/Home";
import Booking from "./components/Mybookings/Booking";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
