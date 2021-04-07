import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginations = (props) => {
  const { pager, handlePagination, category } = props;

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink first onClick={() => handlePagination(category, pager.startPage && pager.startPage)} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous onClick={() => handlePagination(category, pager.currentPage && pager.currentPage - 1)} />
      </PaginationItem>
      {pager.pages && pager.pages.map((page, i) => (
        <PaginationItem key={i} active={pager.currentPage === i + 1}>
          <PaginationLink onClick={() => handlePagination(category, page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink next onClick={() => handlePagination(category, pager.currentPage && pager.currentPage + 1)} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last onClick={() => handlePagination(category, pager.endPage && pager.endPage)} />
      </PaginationItem>
    </Pagination>
  );
}

export default Paginations;