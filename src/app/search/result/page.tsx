'use client';
import { useState } from 'react';

import { Container, Box, Pagination, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
//import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { getBookIsbnSearchRequest, getBooksSearchRequest } from '../../actions/types';
import BooksContainer from '../../components/Book/BooksContainer';
import { RootState } from '../../reducers';
import { AppDispatch } from '../../store/store';
import { isbnType } from '../types/isbnType';
import { SearchType } from '../types/searchType';

const ResultPage = () => {
  const queryParams = useSearchParams();
  const isbn = queryParams.get('isbn');
  const searchCondition = queryParams.get('searchCondition');
  let parsedIsbn: isbnType, pasrsedSearchCondition: SearchType;
  if (isbn) {
    parsedIsbn = JSON.parse(decodeURIComponent(isbn)); // URL 디코딩 및 JSON 파싱
  }
  if (searchCondition) {
    pasrsedSearchCondition = JSON.parse(decodeURIComponent(searchCondition)); // URL 디코딩 및 JSON 파싱
  }

  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const { books, count } = useSelector((store: RootState) => store.book);
  const booksPerPage = 20;
  const pageCount = Math.ceil(count / booksPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    pasrsedSearchCondition.page = value;
    pasrsedSearchCondition.pageSize = booksPerPage;
    if (parsedIsbn) {
      dispatch(getBookIsbnSearchRequest(parsedIsbn));
    } else {
      dispatch(getBooksSearchRequest(pasrsedSearchCondition));
    }
  };

  return (
    <>
      <Container data-testid="books-container" sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {books.length > 0 ? (
          <>
            <BooksContainer books={books} title={'Search Result'} booksPerPage={booksPerPage} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
                sx={{
                  justifyContent: 'center',
                  '& .MuiPagination-ul': {
                    flexWrap: 'nowrap',
                  },
                  '& .MuiPaginationItem-root': {
                    minWidth: '32px',
                    height: '32px',
                  },
                }}
              />
            </Box>
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h6">검색 결과가 없습니다.</Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ResultPage;
