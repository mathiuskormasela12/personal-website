// ========== Pagination
// import all modules
import React from 'react';
import type { NextPage } from 'next';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import * as Styled from './pagination.styled';
import { IPaginationProps } from '../../interfaces';

export const Pagination: NextPage<IPaginationProps> = (props) => {
  const { totalPages, page } = props;
  return (
    <Styled.Pagination>
      <Styled.PaginationItems {...props} disabled>
        <GrFormPrevious />
      </Styled.PaginationItems>
      {[...Array(totalPages)].map((item, index) => (
        <Styled.PaginationItems
          // eslint-disable-next-line react/no-array-index-key
          key={index.toString()}
          active={((index + 1) === page || page === 1)}
          {...props}
        >
          {index + 1}
        </Styled.PaginationItems>
      ))}
      <Styled.PaginationItems {...props} disabled>
        <GrFormNext />
      </Styled.PaginationItems>
    </Styled.Pagination>
  );
};

Pagination.defaultProps = {
  page: 1,
};
