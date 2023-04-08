import { useState, useEffect } from "react";
import TopBar from "../topbar/Topbar";
import { Table } from "react-bootstrap";
import "./dataTableStyle.css";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../searchbox/SearchBox";
import Loading from "../Loading/Loading";
import ShortHandTable from "../tableShortHand/ShortHandTable";
import CustomModal from "../CustomModal/CustomModal";

export default function DataTable({
  data,
  columns,
  modalBody,
  handleAccept,
  handleAdd,
  show,
  handleModalClose,
  addFormData,
  addedData,
  modalAcceptText,
  modalCloseText,
  modalTitle,
  handleAcceptAdd
}) {
  const [info, setInfo] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [addBtnDisable, setAddBtnDisable] = useState(false);
  const [editBtnDisable, setEditBtnDisable] = useState(true);
  const [declineBtnDisable, setDeclineBtnDisable] = useState(true);
  const [acceptBtnDisable, setAcceptBtnDisable] = useState(true);
  const [deleteBtnDisable, setDeleteBtnDisable] = useState(true);

  useEffect(() => {
    setInfo(data);
    setFilteredData(data);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [itemsPerPage,addedData]);

  //////CHANGE ITEM PER PAGE BY SELECT///

  useEffect(() => {
    if (addFormData != null) {
      setFilteredData([...filteredData, addFormData]);
      setAddBtnDisable(true);
      setDeclineBtnDisable(false);
      setAcceptBtnDisable(false);
    }
  }, [addFormData]);
  useEffect(() => {
    if(addedData != null){
      const element = document.getElementById({addedData});
      console.log(addedData)

      if (element) {
        element.focus();
        console.log(element)
      }
    }
  }, [addedData])
  

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredData.length / itemsPerPage);
    setTotalPages(newTotalPages);
    if(addFormData != null){
    setCurrentPage(newTotalPages);

    }else{
    setCurrentPage(1);
    }
  }, [filteredData, itemsPerPage, addFormData]);

  const handleItemsPerPage = (e) => {
    const value = e.target.value;
    setItemsPerPage(value);
    setFilteredData((prevFilteredData) => prevFilteredData);
    const newTotalPages = Math.ceil(filteredData.length / value);
    setTotalPages(newTotalPages);
    setCurrentPage(1);
  };

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
  // const handleSearchByName = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   const filtered = info.filter((item) => {
  //     return item.bankName.toLowerCase().includes(query);
  //   });
  //   setFilteredData(filtered);
  //   setCurrentPage(1); // reset current page
  // };

  // const handleSearchByCode = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   const filtered = info.filter((item) => {
  //     const lowerCaseBankCode = item.bankCode.toString().toLowerCase();
  //     return lowerCaseBankCode.includes(query);
  //   });
  //   setFilteredData(filtered);
  //   setCurrentPage(1); // reset current page
  // };

  /////////HANDLE TABLE///////
  // if (addFormData) {
  // setDataAppended([...paginatedData, addFormData])
  // }

  const infoThead = !info ? (
    <Loading />
  ) : (
    columns.map((column, index) => {
      if (column.hidden) {
        return null;
      } else {
        return <th key={index}>{column.title}</th>;
      }
    })
  );
  
  const infoTbody = !info ? (
    <Loading />
  ) : (
    paginatedData.map((row, index) => (
      <tr key={index} id={`${row.bankId}`}>
        {columns.map((column, index) => {
          if (column.hidden) {
            return null;
          } else if (column.customKey === "searchColumn") {
            return (
              <td key={index}>
                <SearchBox handleSearchInput={(e) => handleSearchBox(e)} />
              </td>
            );
          } else {
            return <td key={index}>{row[column.customKey]}</td>;
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
            <Table responsive hover bordered>
              <thead className="bg-primary text-light">
                <tr>{infoThead}</tr>
              </thead>
              <tbody>
                {/* <tr>
                  {columns.map((column, index) => (
                    <td key={index}>
                      <SearchBox
                        handleSearchInput={(e) => handleSearchBox(e)}
                      />
                    </td>
                  ))}
                </tr> */}
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
                handleAdd={handleAdd}
                handleAcceptAdd={handleAcceptAdd}
                addBtnDisable={addBtnDisable}
                editBtnDisable={editBtnDisable}
                declineBtnDisable={declineBtnDisable}
                acceptBtnDisable={acceptBtnDisable}
                deleteBtnDisable={deleteBtnDisable}
              />
            </div>
            <CustomModal
              modalBody={modalBody}
              handleAccept={handleAccept}
              showOn={show}
              handleModalClose={handleModalClose}
              modalClose="انصراف"
              modalAcceptText={modalAcceptText}
              modalCloseText={modalCloseText}
              modalTitle={modalTitle}
            />
          </>
        )}
      </div>
    </>
  );
}
