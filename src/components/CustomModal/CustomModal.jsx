import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CustomToolTip from "../customTooltip/CustomToolTip";

export default function CustomModal({
  modalBody,
  showOn,
  modalCloseText,
  handleAccept,
  modalAcceptText,
  handleModalClose,
  modalTitle,
  toottipBtnText,
  popoverBody,
  popoverHeader,
  popoverId
}) {
  return (
    <>
      <Modal
        show={showOn}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title className="w-100">
            <div className="space-between-style">
              <h3>{modalTitle}</h3>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            {modalCloseText}
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            {modalAcceptText}
          </Button>
          {/* <Button disable={disableBtn1} className={classBtn1} onClick={handleClickBtn1}>
            {textBtn1}
          </Button>
          <Button disable={disableBtn2} className={classBtn2} onClick={handleClickBtn2}>
            {textBtn2}
          </Button>
          <Button disable={disableBtn3} className={classBtn3} onClick={handleClickBtn3}>
            {textBtn3}
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
