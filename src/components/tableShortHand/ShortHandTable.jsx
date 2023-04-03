import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function ShortHandTable() {
  return (
    <>
      <div className="centered-style">
        <ButtonGroup className="mb-2 ">
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </div>
    </>
  );
}
