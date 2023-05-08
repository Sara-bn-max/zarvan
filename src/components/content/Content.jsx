import React from "react";
import { DashLg, X, ZoomIn } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import DataTable from "../dataTable/DataTable";
import "./contentStyle.css";

export default function Content({
  data,
  columns,
  modalBodyAdd,
  handleAdd,
  handleAcceptAdd,
  handleDelete,
  show,
  handleModalCloseAdd,
  handleAcceptModalAdd,
  handleSubmitAdd,
  addFormData,
  addedData,
  modalAcceptText,
  modalCloseText,
  modalTitle,
  modalBodyDl,
  handleSubmitDl,
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
  handleSubmitEdit = { handleSubmitEdit },
  modalCloseTextEdit,
  modalTitleEdit,
  deleteResponse,
  handleEdit,
  handleSubmitCenter,
  modalBodyCenter,
  handleAcceptCenter,
  showCenter,
  handleModalCloseCenter,
  handleCenter,
  selected,
  idName,
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
            handleSubmitAdd={handleSubmitAdd}
            handleAcceptAdd={handleAcceptAdd}
            modalBodyAdd={modalBodyAdd}
            show={show}
            handleModalCloseAdd={handleModalCloseAdd}
            handleAcceptModalAdd={handleAcceptModalAdd}
            addFormData={addFormData}
            addedData={addedData}
            modalAcceptText={modalAcceptText}
            modalCloseText={modalCloseText}
            modalTitle={modalTitle}
            modalBodyDl={modalBodyDl}
            handleSubmitDl={handleSubmitDl}
            handleAcceptDl={handleAcceptDl}
            showDl={showDl}
            handleModalCloseDl={handleModalCloseDl}
            modalAcceptTextDl={modalAcceptTextDl}
            modalCloseTextDl={modalCloseTextDl}
            modalTitleDl={modalTitleDl}
            modalBodyEdit={modalBodyEdit}
            handleAcceptEdit={handleAcceptEdit}
            handleSubmitEdit={handleSubmitEdit}
            showEdit={showEdit}
            handleModalCloseEdit={handleModalCloseEdit}
            modalAcceptTextEdit={modalAcceptTextEdit}
            modalCloseTextEdit={modalCloseTextEdit}
            modalTitleEdit={modalTitleEdit}
            deleteResponse={deleteResponse}
            handleSubmitCenter={handleSubmitCenter}
            modalBodyCenter={modalBodyCenter}
            handleAcceptCenter={handleAcceptCenter}
            showCenter={showCenter}
            handleModalCloseCenter={handleModalCloseCenter}
            handleCenter={handleCenter}
            selected={selected}
            idName={idName}
          />
        </div>
      </div>
    </div>
  );
}
