import React, { useEffect, useState } from "react";
import axios from "axios";
import AppointmentModal from "../../modals/modal";
import API_BASE_URL from '../../config';
import "./Booking.css";
import Navbar from "../Navbar/Navbar";

const Booking = () => {
  const [appointments, setAppointments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/appointments`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAppointment(null);
  };

  const handleUpdate = () => {
    axios
      .put(`${API_BASE_URL}/appointments/${selectedAppointment._id}`, selectedAppointment)
      .then(() => {
        alert("Appointment updated!");
        setAppointments((prev) =>
          prev.map((app) => (app._id === selectedAppointment._id ? selectedAppointment : app))
        );
        closeModal();
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/appointments/${id}`)
      .then(() => {
        alert("Appointment deleted!");
        setAppointments(appointments.filter((appointment) => appointment._id !== id));
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  const handleChange = (e) => {
    setSelectedAppointment({ ...selectedAppointment, [e.target.name]: e.target.value });
  };

  return (
    <>
       <Navbar/>
    <div className="booking-container">
     
      <h2>My Bookings</h2>
      <div className="booking-list">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment._id} className="booking-card">
              <p><strong>PatientName:</strong> {appointment.patientName}</p>
              <p><strong>AppointmentType:</strong> {appointment.appointmentType}</p>
              <p><strong>Date & Time:</strong> {appointment.date}</p>
              <div className="button-group">
                <button className="update-btn" onClick={() => openModal(appointment)}>
                  Update
                </button>
                <button className="delete-btn" onClick={() => handleDelete(appointment._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
      <AppointmentModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        appointment={selectedAppointment}
        handleChange={handleChange}
        handleSubmit={handleUpdate}
      />
    </div>
    </>
  );
};

export default Booking;
