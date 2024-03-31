import React from "react";
import "./Input.css";

const Input = ({ label, value, type, onChange, name, placeholder, disabled }) => {
  const newValue = type === "date" ? value?.split("T")[0] : value;

  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        className="details-input"
        disabled={disabled}
        type={type}
        name={name}
        value={newValue}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
