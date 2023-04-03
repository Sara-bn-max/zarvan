import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function CustomModal({
  modalBody,
  modalClose,
  handleAccept,
  modalAccept,
  showOn,
  handleModalClose,
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
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            {modalClose}
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            {modalAccept}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
