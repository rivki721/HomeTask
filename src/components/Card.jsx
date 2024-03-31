import React from "react";
import "./Card.css";

const Card = ({ pickedPatientId, patient, onClick }) => {
  const handleOnClick = () => {
    onClick(patient);
  };

  return (
    <button onClick={handleOnClick} className={`card-container ${pickedPatientId === patient.id && "current"}`}>
      <h2>
        {patient.memberFirstName} {patient.memberLastName}
      </h2>
      <p>ID: {patient.taz}</p>
    </button>
  );
};

export default Card;
