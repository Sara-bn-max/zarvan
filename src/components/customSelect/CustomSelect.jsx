import React from "react";
import Form from "react-bootstrap/Form";
import './customSelectStyle.css'

export default function CustomSelect({ children, handleSelect }) {
  return (
    <>
      <Form.Select className="customSelect" onChange={handleSelect} aria-label="Default select m-3">
        {children}
      </Form.Select>
    </>
  );
}
