import React from "react";
import "./customInputStyle.css";

export default function CustomInput({disabled,type, inputName,required,labelText, value, handleChange}) {
  return (
    <div className="form-control">
      <input
        type={type}
        name={inputName}
        className="form-input"
        placeholder="none"
        required={required}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      />
      <label for="name" className="form-label">
       {labelText}
      </label>
    </div>
  );
}
