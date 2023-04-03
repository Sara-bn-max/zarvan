import React from "react";
import CustomSelect from "../customSelect/CustomSelect";
import SearchBox from "../searchbox/SearchBox";
import "./topBarStyle.css";

export default function TopBar({
  handlePageCount,
  handeSortType,
  handleSearch,
}) {
  return (
    <div className="topbar">
      <div>
        <SearchBox handleSearchInput={handleSearch} />
      </div>
      <div>
        <CustomSelect handleSelect={handlePageCount}>
          <option value={5}>ردیف 5 تایی</option>
          <option value={10}>ردیف 10 تایی</option>
          <option value={20}>ردیف 20 تایی</option>
        </CustomSelect>
      </div>
    </div>
  );
}
