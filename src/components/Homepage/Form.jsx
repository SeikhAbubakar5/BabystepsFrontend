import React, { useState } from 'react';
import "./Form.css"
import axios from 'axios';
import API_BASE_URL from '../../config';

const BookingForm = ({ doctorId, date, time }) => {
  const [patientName, setPatientName] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [duration, setDuration] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const appointmentData = {
      doctorId,
      date,
      time,
      duration,
      appointmentType,
      patientName
    };

    axios.post(`${API_BASE_URL}/appointments`, appointmentData)
      .then(() => alert("Appointment booked successfully!"))
      .catch(error => console.error("Error booking appointment:", error));
  };

  return (
    <div className='container'>
     
      <form onSubmit={handleSubmit}>
        
        <div>
        <label>Patient Name:</label>
        <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
        </div>

       <div>
       <label>Appointment Type:</label>
       <input type="text" value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)} required />
       </div>

        <label>Duration (minutes):</label>
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value={30}>30</option>
          <option value={60}>60</option>
        </select>

        <div>
        <button type="submit">Confirm Booking</button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
