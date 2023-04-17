import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CustomToolTip from "../customTooltip/CustomToolTip";
import Form from "react-bootstrap/Form";

export default function CustomModal({
  modalBody,
  showOn,
  modalCloseText,
  handleAcceptModal,
  modalAcceptText,
  handleModalClose,
  modalTitle,
  toottipBtnText,
  popoverBody,
  popoverHeader,
  popoverId,
  classNameUse,
  handleSubmit,
}) {
  return (
    <>
      <Modal
        className={classNameUse}
        show={showOn}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title className="w-100">
              <div className="space-between-style">
                <h3>{modalTitle}</h3>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" onClick={handleAcceptModal}>
              {modalAcceptText}
            </Button>
            <Button variant="danger" onClick={handleModalClose}>
              {modalCloseText}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
