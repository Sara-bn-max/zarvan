import { useState, useEffect } from "react";
import TopBar from "../topbar/Topbar";
import { Table } from "react-bootstrap";
import "./dataTableStyle.css";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../searchbox/SearchBox";
import Loading from "../Loading/Loading";
import ShortHandTable from "../tableShortHand/ShortHandTable";
import { get } from "../../servises/axios/api";

export default function DataTable({ data, columns }) {
  const [info, setInfo] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  // const [tableColumns, setTableColumns] = useState([columns]);

  ////handle bank data/////
  // useEffect(() => {
  //   get(`/ACCBank/GetAllBanks/`)
  //     .then((response) => {
  //       setInfo(response.data);
  //       setFilteredData(response.data);
  //       setTotalPages(Math.ceil(response.data.length / itemsPerPage));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [itemsPerPage]);
  useEffect(() => {
    setInfo(data);
    setFilteredData(data);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [itemsPerPage]);
  if (info !== null) {
    localStorage.setItem("banksData", JSON.stringify(info));
  }

  //////CHANGE ITEM PER PAGE BY SELECT///
  const handleItemsPerPage = (e) => {
    const value = e.target.value;
    setItemsPerPage(value);
    const newTotalPages = Math.ceil(filteredData.length / value);
    setTotalPages(newTotalPages);
    setCurrentPage(1); // reset current page
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
    setCurrentPage(1); // reset current page
  };

  const handleSearchByName = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = info.filter((item) => {
      return item.bankName.toLowerCase().includes(query);
    });
    setFilteredData(filtered);
    setCurrentPage(1); // reset current page
  };

  const handleSearchByCode = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = info.filter((item) => {
      const lowerCaseBankCode = item.bankCode.toString().toLowerCase();
      return lowerCaseBankCode.includes(query);
    });
    setFilteredData(filtered);
    setCurrentPage(1); // reset current page
  };
  /////////HANDLE TABLE

  const infoThead = !info ? (
    <Loading />
  ) : (
    columns.map((column, index) => <th key={index}>{column.title}</th>)
  );
  const infoTbody = !info ? (
    <Loading />
  ) : (
    data.map((row, index) => (
      <>
        <tr key={index}>
          {columns.map((column, index) => (
            <td key={index}>{row[column.customKey]}</td>
          ))}
        </tr>
      </>
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
                <tr>
                  {columns.map((column, index) => (
                    <td key={index}>
                      <SearchBox
                        handleSearchInput={(e) => handleSearchBox(e)}
                      />
                    </td>
                  ))}
                </tr>
                {infoTbody}
              </tbody>
            </Table>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={setCurrentPage}
            />
            <ShortHandTable />
          </>
        )}
      </div>
    </>
  );
}
