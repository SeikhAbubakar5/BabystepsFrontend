import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import BookingForm from './Form';
import axios from 'axios';
import API_BASE_URL from '../../config';
import './Home.css';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/appointments/doctors`)
      .then(response => setDoctors(response.data))
      .catch(error => console.error("Error fetching doctors:", error));
  }, []);

  const handleDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedTime(null);
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleBookNow = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const generateTimeSlots = () => {
    let slots = [];
    let startTime = 9 * 60;
    let endTime = 19 * 60;
    for (let time = startTime; time < endTime; time += 30) {
      let hours = Math.floor(time / 60);
      let minutes = time % 60;
      let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes === 0 ? '00' : '30'}`;
      slots.push(formattedTime);
    }
    return slots;
  };

  return (
    <div>
      <Navbar />
      <h1>Doctor Appointment Booking</h1>

      <h2>Select a Doctor:</h2>
      <ul className="doctor-list">
        {doctors.map(doctor => (
          <li key={doctor._id} onClick={() => handleDoctor(doctor)}>
            {doctor.name}
          </li>
        ))}
      </ul>

      {selectedDoctor && (
        <div>
          <h2>Select a Date:</h2>
          <input 
            type="date" 
            min={new Date().toISOString().split('T')[0]} 
            max={new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 
            onChange={handleDateChange}
          />
        </div>
      )}

      {selectedDate && (
        <div>
          <h2>Select a Time:</h2>
          <select onChange={handleTimeSlotChange}>
            <option value="">--Select Time--</option>
            {generateTimeSlots().map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      )}

      {selectedTime && (
        <button className="book-now" onClick={handleBookNow}>
          Book Now
        </button>
      )}

{showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Confirm Booking</h2>
      <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
      <p><strong>Date:</strong> {selectedDate}</p>
      <p><strong>Time:</strong> {selectedTime}</p>

      <BookingForm 
        doctorId={selectedDoctor._id} 
        date={selectedDate} 
        time={selectedTime} 
      />

      <div className="modal-buttons">
        <button className="cancel-btn" onClick={closeModal}>Cancel</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Home;
