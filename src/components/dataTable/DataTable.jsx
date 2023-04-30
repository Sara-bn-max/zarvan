import { useState, useEffect } from "react";
import TopBar from "../topbar/Topbar";
import { Table } from "react-bootstrap";
import "./dataTableStyle.css";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../searchbox/SearchBox";
import Loading from "../Loading/Loading";
import ShortHandTable from "../tableShortHand/ShortHandTable";
import CustomModal from "../CustomModal/CustomModal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import CustomToolTip from "../customTooltip/CustomToolTip";

export default function DataTable({
  data,
  columns,
  modalBodyAdd,
  handleSubmitAdd,
  handleAcceptModalAdd,
  handleAdd,
  handleDelete,
  handleEdit,
  show,
  handleModalCloseAdd,
  addFormData,
  addedData,
  modalAcceptText,
  modalCloseText,
  modalTitle,
  handleAcceptAdd,
  modalBodyDl,
  handleSubmitDl,
  handleAcceptDl,
  showDl,
  handleModalCloseDl,
  modalAcceptTextDl,
  modalCloseTextDl,
  modalTitleDl,
  modalBodyEdit,
  handleSubmitEdit,
  handleAcceptEdit,
  showEdit,
  handleModalCloseEdit,
  modalAcceptTextEdit,
  modalCloseTextEdit,
  modalTitleEdit,
  deleteResponse,
  handleDecline,
  selected,
  idName,
}) {
  const [info, setInfo] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [addBtnDisable, setAddBtnDisable] = useState(false);
  const [editBtnDisable, setEditBtnDisable] = useState(true);
  const [declineBtnDisable, setDeclineBtnDisable] = useState(true);
  const [acceptBtnDisable, setAcceptBtnDisable] = useState(true);
  const [deleteBtnDisable, setDeleteBtnDisable] = useState(true);
  const [selectedTrId, setSelectedTrId] = useState(null);
  const [selectedTrData, setSelectedTrData] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setInfo(data);
    setFilteredData(data);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [itemsPerPage]);

  //////CHANGE ITEM PER PAGE BY SELECT///
  /////handle change data for add an item
  useEffect(() => {
    if (addFormData != null) {
      setFilteredData([...filteredData, addFormData]);
      setAddBtnDisable(true);
      setDeclineBtnDisable(false);
      setAcceptBtnDisable(false);
    }
  }, [addFormData]);
  useEffect(() => {
    if (deleteResponse) {
      const updatedData = filteredData.filter(
        (item) => item[`${idName}`] !== deleteResponse
      );
      if (typeof deleteResponse === "number") {
        const element = document.getElementById(deleteResponse);
        if (element) {
          element.classList.remove("selected");
        }
      }
      setFilteredData(updatedData);
      setAddBtnDisable(false);
      setDeclineBtnDisable(true);
      setAcceptBtnDisable(true);
      setEditBtnDisable(true);
      setDeleteBtnDisable(true);
    }
  }, [deleteResponse]);
  useEffect(() => {
    const newTotalPages = Math.ceil(filteredData.length / itemsPerPage);
    setTotalPages(newTotalPages);
    if (addFormData != null) {
      setCurrentPage(newTotalPages);
    } else {
      setCurrentPage(1);
    }
  }, [filteredData, itemsPerPage, addFormData, deleteResponse]);
  useEffect(() => {
    if (addedData != null) {
      if (typeof addedData === "number") {
        const element = document.getElementById(addedData);
        if (element) {
          element.classList.addClass("selected");
        }
      }
      setAddBtnDisable(false);
      setDeclineBtnDisable(true);
      setAcceptBtnDisable(true);
      setEditBtnDisable(true);
      setDeleteBtnDisable(true);

      // if (element) {
      //   element.focus();
      //   console.log(element);
      // }
    }
  }, [addedData]);
  useEffect(() => {
    if (selected != null) {
      if (selected == false) {
        const element = document.getElementsByClassName(selected);
        if (element) {
          element.classList.remove("selected");
        }
      }
    }
  }, []);

  //////DATA AFTER DELETE///
  const handleItemsPerPage = (e) => {
    const value = e.target.value;
    setItemsPerPage(value);
    setFilteredData((prevFilteredData) => prevFilteredData);
    const newTotalPages = Math.ceil(filteredData.length / value);
    setTotalPages(newTotalPages);
    setCurrentPage(1);
  };
  //////////////DATA SORTING///
  const [sortedData, setSortedData] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  function sortByField(key) {
    const sortedArray = [...filteredData].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return valueA - valueB;
      } else {
        const collator = new Intl.Collator("fa");
        return collator.compare(valueA.toString(), valueB.toString());
      }
    });

    const newSortedData =
      sortDirection === "desc" ? sortedArray.reverse() : sortedArray;

    setSortedData(newSortedData);
    setSortKey(key);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  }

  useEffect(() => {
    if (sortedData) {
      setFilteredData(sortedData);
    }
  }, [sortedData]);
  //////HANDLE PAGINATION///
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + Number(itemsPerPage);
    return filteredData.slice(startIndex, endIndex);
  };
  const paginatedData = getPaginatedData();

  //////HANDLE SEARCH///////
  const handleSearchBox = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = info.filter((item) => {
      const lowerCaseBankCode = item.bankCode.toString().toLowerCase();
      return (
        lowerCaseBankCode.includes(query) ||
        item.bankName.toLowerCase().includes(query)
      );
    });
    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage)); // <-- update totalPages
    setCurrentPage(1); // reset current page
  };

  const handleRowClick = (selectedData) => {
    setIsActive(!isActive);
    setSelectedTrData(selectedData);
    setSelectedTrId(selectedData[`${idName}`]);
    setAddBtnDisable(false);
    setDeclineBtnDisable(true);
    setAcceptBtnDisable(true);
    setEditBtnDisable(!editBtnDisable);
    setDeleteBtnDisable(!deleteBtnDisable);
  };
  //////////HANDLE PRINT/////////
  const handlePrint = () => {
    const table = document.getElementById("prinTable");
    const printWindow = window.open("", "", "height=600,width=800");
    const styleElement = printWindow.document.createElement("style");
    styleElement.innerHTML = `
      table {
        direction: rtl;
        border-collapse: collapse;
        text-align: right;
        margin-top: 1rem;
      }
      th, td {
        border: 1px solid black;
        padding: 0.5rem;
      }
      th {
        background-color: #eee;
      }
    `;
    printWindow.document.head.appendChild(styleElement);
    printWindow.document.body.appendChild(table.cloneNode(true));
    printWindow.print();
    printWindow.close();
  };

  ///////HANDLE EXPORT EXEL//////
  const handleExcel = () => {
    const btn = document.getElementById("button-download-as-xls");
    btn.click();
  };
  /////////HANDLE DATA MAPING//////
  const infoThead = !info ? (
    <Loading />
  ) : (
    columns.map((column, index) => {
      if (column.hidden) {
        return null;
      } else {
        return (
          <th
            key={column.customKey}
            onClick={() => sortByField(column.customKey)}
          >
            {column.title}
          </th>
        );
      }
    })
  );
  const tdSearchBox = !info ? (
    <Loading />
  ) : (
    columns.map((column, index) => {
      if (column.hidden) {
        return null;
      } else {
        return (
          <td key={column.customKey}>
            <SearchBox handleSearchInput={(e) => handleSearchBox(e)} />
          </td>
        );
      }
    })
  );

  const infoTbody = !info ? (
    <Loading />
  ) : (
    paginatedData.map((row, index) => (
      <tr
        key={index}
        id={`${row[`${idName}`]}`}
        onClick={() => handleRowClick(row)}
        className={
          isActive && selectedTrId === row[`${idName}`]
            ? "selected"
            : "Unselected"
        }
      >
        {/* <CustomToolTip
          tooltipBody={
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>{infoThead}</tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    id={`${row[`${idName}`]}`}
                    onClick={() => handleRowClick(row)}
                    className={
                      isActive && selectedTrId === row[`${idName}`]
                        ? "selected"
                        : "Unselected"
                    }
                  >
                    {columns.map((column, index) => {
                        return (
                          <>
                            <td key={index}>{row[column.customKey]}</td>
                          </>
                        );
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          }
        > */}
        {columns.map((column, index) => {
          if (column.hidden) {
            return null;
          } else {
            return (
              <>
                <td key={index}>{row[column.customKey]}</td>
              </>
            );
          }
        })}
        {/* </CustomToolTip> */}
      </tr>
    ))
  );

  /////////HANDLE MAPING TO EXPORT OR PRINT/////
  const infoTheadExport = !info ? (
    <Loading />
  ) : (
    columns.map((column, index) => {
      if (column.hidden) {
        return null;
      } else {
        return (
          <th
            key={column.customKey}
            onClick={() => sortByField(column.customKey)}
          >
            {column.title}
          </th>
        );
      }
    })
  );

  const infoTbodyeExport = !info ? (
    <Loading />
  ) : (
    filteredData.map((row, index) => (
      <tr
        key={index}
        id={`${row[`${idName}`]}`}
        onClick={() => handleRowClick(row)}
        className={
          isActive && selectedTrId === row[`${idName}`]
            ? "selected"
            : "Unselected"
        }
      >
        {columns.map((column, index) => {
          if (column.hidden) {
            return null;
          } else {
            return (
              <>
                <td key={index}>{row[column.customKey]}</td>
              </>
            );
          }
        })}
      </tr>
    ))
  );
  return (
    <>
      <TopBar
        handleSearch={(e) => handleSearchBox(e)}
        handlePageCount={handleItemsPerPage}
      />
      <div className="custom-container">
        {!paginatedData ? (
          <Loading />
        ) : (
          <>
            <table id="prinTable" className="d-none">
              <thead className="bg-primary text-light">
                <tr>{infoTheadExport}</tr>
              </thead>
              <tbody>{infoTbodyeExport}</tbody>
            </table>
            <ReactHTMLTableToExcel
              className="d-none"
              table="prinTable"
              filename="datatable"
              sheet="sheet1"
              buttonText="Export to Excel"
            />
            <Table responsive hover bordered id="table">
              <thead className="bg-primary text-light">
                <tr>{infoThead}</tr>
              </thead>
              <tbody>
                <tr>{tdSearchBox}</tr>
                {infoTbody}
              </tbody>
            </Table>
            <div className="space-between">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={setCurrentPage}
              />
              <ShortHandTable
                handleExcel={handleExcel}
                handlePrint={handlePrint}
                PrintBtnDisable=""
                handleAdd={handleAdd}
                handleDecline={handleDecline}
                handleDelete={() => handleDelete(selectedTrId)}
                handleEdit={() => handleEdit(selectedTrData)}
                handleAcceptAdd={handleAcceptAdd}
                addBtnDisable={addBtnDisable}
                editBtnDisable={editBtnDisable}
                declineBtnDisable={declineBtnDisable}
                acceptBtnDisable={acceptBtnDisable}
                deleteBtnDisable={deleteBtnDisable}
              />
            </div>
            <CustomModal
              handleSubmit={handleSubmitAdd}
              classNameUse="add"
              modalBody={modalBodyAdd}
              handleAcceptModal={handleAcceptModalAdd}
              showOn={show}
              handleModalClose={handleModalCloseAdd}
              modalClose="انصراف"
              modalAcceptText={modalAcceptText}
              modalCloseText={modalCloseText}
              modalTitle={modalTitle}
            />
            <CustomModal
              handleSubmit={handleSubmitDl}
              classNameUse="delete"
              modalBody={modalBodyDl}
              handleAcceptModal={handleAcceptDl}
              showOn={showDl}
              handleModalClose={handleModalCloseDl}
              modalAcceptText={modalAcceptTextDl}
              modalCloseText={modalCloseTextDl}
              modalTitle={modalTitleDl}
            />
            <CustomModal
              handleSubmit={handleSubmitEdit}
              classNameUse="edit"
              modalBody={modalBodyEdit}
              handleAcceptModal={handleAcceptEdit}
              showOn={showEdit}
              handleModalClose={handleModalCloseEdit}
              modalAcceptText={modalAcceptTextEdit}
              modalCloseText={modalCloseTextEdit}
              modalTitle={modalTitleEdit}
            />
          </>
        )}
      </div>
    </>
  );
}
