import { Box, SxProps, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { getBookIsbnSearchRequest, getBooksByCategoryRequest, getBooksSearchRequest, setPage } from '../actions/types';
import { RootState } from '../reducers';
import { useEffect, useMemo } from 'react';
import { SearchType } from '../search/types/searchType';
import { IsbnType } from '../search/types/isbnType';

type CustomPaginationProps = {
  pageCount: number;
  style?: SxProps;
  booksPerPage: number;
  categoryId?: string;
  parsedSearchCondition?: SearchType;
  parsedIsbn?: IsbnType;
};

const CustomPagination = (props: CustomPaginationProps) => {
  const { pageCount, style, booksPerPage, categoryId, parsedSearchCondition, parsedIsbn } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage } = useSelector((store: RootState) => store.book);
  const parsedSearchConditionMemoized = useMemo(() => {
    if (parsedSearchCondition) {
      return { ...parsedSearchCondition, page: currentPage, pageSize: booksPerPage };
    }
    return null;
  }, [parsedSearchCondition, currentPage, booksPerPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  useEffect(() => {
    if (categoryId && !parsedSearchCondition && !parsedIsbn) {
      console.log('category');
      dispatch(getBooksByCategoryRequest({ categoryId: categoryId, page: currentPage, pageSize: booksPerPage }));
    }
  }, [currentPage, parsedSearchCondition, parsedIsbn, categoryId, dispatch]);

  return (
    <Box sx={{ ...style }}>
      <Pagination
        count={pageCount}
        page={currentPage}
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
  );
};
export default CustomPagination;
