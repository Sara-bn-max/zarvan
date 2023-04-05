import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
  Check2Square,
  PencilSquare,
  PlusSquare,
  TrashFill,
  XSquare,
} from "react-bootstrap-icons";

export default function ShortHandTable({handleAdd,handleDecline, handleAcceptAdd, handleDelete,handleEdit}) {
  return (
    <>
      <div className="centered-style">
        <ButtonGroup className="mb-2 custom-rtl-btns">
          <Button onClick={handleAdd}>
            <PlusSquare />
          </Button>
          <Button onClick={handleEdit} disabled>
            <PencilSquare />
          </Button>
          <Button onClick={handleDecline} disabled>
            <XSquare />
          </Button>
          <Button onClick={handleAcceptAdd} disabled>
            <Check2Square />
          </Button>
          <Button onClick={handleDelete} disabled>
            <TrashFill />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}
