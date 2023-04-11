import React from "react";
import { DashLg, X, ZoomIn } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import DataTable from "../dataTable/DataTable";
import "./contentStyle.css";

export default function Content({
  data,
  columns,
  modalBody,
  handleAdd,
  handleAcceptAdd,
  handleDelete,
  show,
  handleModalCloseAdd,
  handleAcceptModalAdd,
  addFormData,
  addedData,
  modalAcceptText,
  modalCloseText,
  modalTitle,
  modalBodyDl,
  handleAcceptDl,
  showDl,
  handleModalCloseDl,
  modalAcceptTextDl,
  modalCloseTextDl,
  modalTitleDl,
  modalBodyEdit,
  handleAcceptEdit,
  showEdit,
  handleModalCloseEdit,
  modalAcceptTextEdit,
  modalCloseTextEdit,
  modalTitleEdit,
  deleteResponse,
  handleEdit,
  selected
}) {
  return (
    <div className="contentBox">
      <div className="customWindow">
        <div className="shortHandBtn">
          <Button variant="outline-light m-1 d-inline">
            <DashLg />
          </Button>
          <Button variant="outline-light m-1 d-inline">
            <ZoomIn />
          </Button>
          <Button variant="outline-light m-1 d-inline">
            <X />
          </Button>
        </div>
        <div className="mainContent">
          <DataTable
            data={data}
            columns={columns}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleAcceptAdd={handleAcceptAdd}
            modalBody={modalBody}
            show={show}
            handleModalCloseAdd={handleModalCloseAdd}
            handleAcceptModalAdd={handleAcceptModalAdd}
            addFormData={addFormData}
            addedData={addedData}
            modalAcceptText={modalAcceptText}
            modalCloseText={modalCloseText}
            modalTitle={modalTitle}
            modalBodyDl={modalBodyDl}
            handleAcceptDl={handleAcceptDl}
            showDl={showDl}
            handleModalCloseDl={handleModalCloseDl}
            modalAcceptTextDl={modalAcceptTextDl}
            modalCloseTextDl={modalCloseTextDl}
            modalTitleDl={modalTitleDl}
            modalBodyEdit={modalBodyEdit}
            handleAcceptEdit={handleAcceptEdit}
            showEdit={showEdit}
            handleModalCloseEdit={handleModalCloseEdit}
            modalAcceptTextEdit={modalAcceptTextEdit}
            modalCloseTextEdit={modalCloseTextEdit}
            modalTitleEdit={modalTitleEdit}
            deleteResponse={deleteResponse}
            selected={selected}
          />
        </div>
      </div>
    </div>
  );
}
