import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
  Check2,
  FileEarmarkExcel,
  Geo,
  Pencil,
  Plus,
  Printer,
  TrashFill,
  X,
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
  handlePrint,
  PrintBtnDisable,
  handleExcel,
  excelBtnDisable,
  handleCenter,
  centerBtnDisable,
}) {
  return (
    <>
      <div className="centered-style">
        <ButtonGroup className="custom-rtl-btns">
          <Button variant="primary" className="primary mx-1" onClick={handleAdd} disabled={addBtnDisable}>
            <Plus />
          </Button>
          <Button variant="primary"  className="primary mx-1" onClick={handleEdit} disabled={editBtnDisable}>
            <Pencil />
          </Button>
          <Button variant="primary"  className="primary mx-1" onClick={handleDecline} disabled={declineBtnDisable}>
            <X />
          </Button>
          <Button variant="primary"  className="primary mx-1" onClick={handleAcceptAdd} disabled={acceptBtnDisable}>
            <Check2 />
          </Button>
          <Button variant="primary"  className="primary mx-1" onClick={handleDelete} disabled={deleteBtnDisable}>
            <TrashFill />
          </Button>
          <Button variant="primary"  className="primary mx-1" onClick={handlePrint} disabled={PrintBtnDisable}>
            <Printer />
          </Button>
          <Button variant="primary"  className="primary mx-1" onClick={handleExcel} disabled={excelBtnDisable}>
            <FileEarmarkExcel />
          </Button>
          <Button variant="primary"  className="primary mx-1" onClick={handleCenter} disabled={centerBtnDisable}>
            <Geo />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}
