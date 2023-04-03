import React from "react";
import Form from "react-bootstrap/Form";

export default function SearchBox({handleSearchInput}) {
  return (
    <>
      <Form.Control type="text" placeholder="search some thing" onChange={handleSearchInput} />
    </>
  );
}
