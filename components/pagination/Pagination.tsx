// ========== Pagination
// import all modules
import React, { Fragment } from 'react';
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
      {[...Array(totalPages)].map((item, index) => {
        const pageInLooping = index + 1;

        if (pageInLooping === 6) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index.toString()}>
              <Styled.PaginationItems
                active={(pageInLooping === page)}
                {...props}
              >
                ...
              </Styled.PaginationItems>
              <Styled.PaginationItems
							// eslint-disable-next-line react/no-array-index-key
                key={index.toString()}
                active={(pageInLooping === page)}
                {...props}
              >
                {totalPages}
              </Styled.PaginationItems>
            </Fragment>
          );
        } if (pageInLooping < 6) {
          return (
            <Styled.PaginationItems
								// eslint-disable-next-line react/no-array-index-key
              key={index.toString()}
              active={(pageInLooping === page)}
              {...props}
            >
              {pageInLooping}
            </Styled.PaginationItems>
          );
        }

        return null;
      })}
      <Styled.PaginationItems {...props} disabled>
        <GrFormNext />
      </Styled.PaginationItems>
    </Styled.Pagination>
  );
};

Pagination.defaultProps = {
  page: 1,
};
