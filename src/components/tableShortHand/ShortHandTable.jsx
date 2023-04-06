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

export default function ShortHandTable({
  handleAdd,
  handleDecline,
  handleAcceptAdd,
  handleDelete,
  handleEdit,
  addBtnDisable,
  editBtnDisable,
  declineBtnDisable,
  acceptBtnDisable,
  deleteBtnDisable,
}) {
  return (
    <>
      <div className="centered-style">
        <ButtonGroup className="mb-2 custom-rtl-btns">
          <Button onClick={handleAdd} disabled={addBtnDisable}>
            <PlusSquare />
          </Button>
          <Button onClick={handleEdit} disabled={editBtnDisable}>
            <PencilSquare />
          </Button>
          <Button onClick={handleDecline} disabled={declineBtnDisable}>
            <XSquare />
          </Button>
          <Button onClick={handleAcceptAdd} disabled={acceptBtnDisable}>
            <Check2Square />
          </Button>
          <Button onClick={handleDelete} disabled={deleteBtnDisable}>
            <TrashFill />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}
