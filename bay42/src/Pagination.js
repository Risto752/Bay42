import React from "react";

export const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  setDummy,
  dummy,
}) => {
  let pages = [];
  let maxPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= maxPages; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setCurrentPage(1);
            setDummy(++dummy);
          }}
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => {
            if (currentPage === 1) return;
            setCurrentPage(--currentPage);
            setDummy(++dummy);
          }}
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => {
            if (currentPage === maxPages) return;
            setCurrentPage(++currentPage);
            setDummy(++dummy);
          }}
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => {
            setCurrentPage(maxPages);
            setDummy(++dummy);
          }}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {currentPage} of {maxPages}
          </strong>{" "}
        </span>
        <span>
          <button
            onClick={() => {
              setCurrentPage(currentPage);
              setDummy(++dummy);
            }}
          >
            Go to page{" "}
          </button>{" "}
          <input
            type="number"
            defaultValue={1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 0;
              setCurrentPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>
      </div>
    </div>
  );
};

export default Pagination;
