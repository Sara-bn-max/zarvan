import React from "react";
import { DashLg, X, ZoomIn } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import DataTable from "../dataTable/DataTable";
import "./contentStyle.css";

export default function Content({data, columns}) {
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
        <div className="mainContent"><DataTable data={data} columns={columns}/></div>
      </div>
    </div>
  );
}
