import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ onPageChange, totalPages, currentPage }) => {
    return (
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages || 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(data) => onPageChange(data.selected + 1)}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            forcePage={currentPage - 1}
        />
    );
};

export default Pagination;
