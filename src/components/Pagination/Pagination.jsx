import { Button } from "react-bootstrap";
import "./paginationStyle.css";

export default function Pagination({ currentPage, totalPages, onChange }) {
  const handleClick = (page) => () => onChange(page);

  return (
    <div className="customPagination">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Button className="mx-1" key={page} onClick={handleClick(page)} disabled={page === currentPage}>
          {page}
        </Button>
      ))}
    </div>
  );
}