import React from "react";
import Modal from "react-modal";
import "./modal.css"

Modal.setAppElement("#root");

const AppointmentModal = ({ isOpen, closeModal, appointment, handleChange, handleSubmit }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal">
      <h2>{appointment?._id ? "Update Appointment" : "New Appointment"}</h2>

      <label>Patient Name:</label>
      <input
        type="text"
        name="patientName"
        value={appointment?.patientName || ""}
        onChange={handleChange}
      />

      <label>Appointment Type:</label>
      <input
        type="text"
        name="appointmentType"
        value={appointment?.appointmentType || ""}
        onChange={handleChange}
      />
      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={appointment?.date || ""}
        onChange={handleChange}
      />

      <label>Time:</label>
      <input
        type="time"
        name="time"
        value={appointment?.time || ""}
        onChange={handleChange}
      />

      <label>Duration (minutes):</label>
      <input
        type="number"
        name="duration"
        value={appointment?.duration || ""}
        onChange={handleChange}
      />

      <div className="modal-buttons">
        <button className="save-btn" onClick={handleSubmit}>Save</button>
        <button className="cancel-btn" onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
