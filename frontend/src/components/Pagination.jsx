import { useState, useEffect } from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    setVisiblePages(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    );
  }, [currentPage, totalPages]);

  return (
    <div className="flex mt-4 flex-wrap gap-5 justify-center items-center">
      <span
        className="p-3 border cursor-pointer"
        onClick={() =>
          setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)
        }
      >
        Previous
      </span>
      {visiblePages.map((pageNum) => {
        return (
          <span
            className={`hidden px-4 py-3 rounded cursor-pointer transition-all duration-300  hover:text-white hover:bg-gray-800 sm:flex
              ${
                currentPage === pageNum
                  ? `text-white bg-gray-800`
                  : `text-gray-800 bg-white`
              }
            `}
            key={`page${pageNum}`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </span>
        );
      })}
      <div
        className="p-3 border cursor-pointer"
        onClick={() =>
          setCurrentPage(
            currentPage === totalPages ? currentPage : currentPage + 1
          )
        }
      >
        Next
      </div>
    </div>
  );
};

export default Pagination;
