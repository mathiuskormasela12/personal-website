// ========== Pagination
// import all modules
import React, { Fragment } from 'react';
import type { NextPage } from 'next';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import * as Styled from './pagination.styled';
import { IGlobalStates, IPaginationProps } from '../../interfaces';

export const Pagination: NextPage<IPaginationProps> = (props) => {
  const { totalPages, page } = props;
  const router = useRouter();
  const nextPage: number = useSelector((current: IGlobalStates) => current.projects.nextPage);
  const previousPage: number = useSelector(
    (current: IGlobalStates) => current.projects.previousPage,
  );

  const handleNextPage = () => {
    router.push(`/?page=${String(page + 1)}`, undefined, { shallow: true });
  };

  const handlePreviousPage = () => {
    router.push(`/?page=${String(page - 1)}`, undefined, { shallow: true });
  };

  const moveToThePage = (currentPage: number) => {
    router.push(`/?page=${String(currentPage)}`, undefined, { shallow: true });
  };

  return (
    <Styled.Pagination>
      <Styled.PaginationItems
        {...props}
        disabled={previousPage === 0}
        onClick={previousPage !== 0 ? handlePreviousPage : () => {}}
      >
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
              onClick={() => moveToThePage(pageInLooping)}
            >
              {pageInLooping}
            </Styled.PaginationItems>
          );
        }

        return null;
      })}
      <Styled.PaginationItems
        {...props}
        onClick={nextPage > 0 ? handleNextPage : () => {}}
        disabled={nextPage < 1}
      >
        <GrFormNext />
      </Styled.PaginationItems>
    </Styled.Pagination>
  );
};

Pagination.defaultProps = {
  page: 1,
};
