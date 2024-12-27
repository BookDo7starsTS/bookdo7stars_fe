import { useState, useEffect, ChangeEvent } from 'react';

import { getBooksSearchRequest } from '@/app/actions/types';
import { SearchType } from '@/app/search/types/searchType';
import { AppDispatch } from '@/app/store/store';
import { useMediaQuery, Container, Typography, Grid, Box, Pagination, Checkbox, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import useTheme from '@mui/system/useTheme';
import { useDispatch } from 'react-redux';

import BookDetailCard from './BookDetailCard';
import { Book } from '../../models/book';
import ResultFilters from '../Result/ResultFilters';
import CustomPagination from '../CustomPagination';
import ToggleButtons from '../Buttons/ToggleButtons';
import ActionButtons from '../Buttons/ActionButtons';
interface SearchResultBooksContainerProps {
  books: Book[];
  count: number;
  booksPerPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  currentPage: number;
  searchTerm?: string;
  resultCount: number;
  parsedSearchCondition: SearchType;
}

const SearchResultBooksContainer: React.FC<SearchResultBooksContainerProps> = ({
  resultCount,
  books,
  count,
  handlePageChange,
  booksPerPage,
  currentPage,
  parsedSearchCondition,
}) => {
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('');
  const pageCount = Math.ceil(count / booksPerPage);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const isWidth900Up = useMediaQuery('(min-width:900px)');

  const handleSelectAll = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map((book) => book.id));
    }
  };

  useEffect(() => {
    // console.log('선택된 책들: ', selectedBooks);
  }, [selectedBooks]);

  const handleAddToCart = () => {
    console.log('여기는 handleAddToCart입니다.');
  };
  const handleAddToWishlist = () => {
    console.log('여기는 handleAddToWishlist입니다.');
  };
  const handleAddToMyList = () => {
    console.log('여기는 handleAddToMyList입니다.');
  };

  const handleCheckboxChange = (bookId: number) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(bookId) ? prevSelectedBooks.filter((id) => id !== bookId) : [...prevSelectedBooks, bookId],
    );
  };

  const handleSortChange = (event: React.MouseEvent<HTMLElement>, newSortBy: string) => {
    setSortBy(newSortBy);
    const updatedSearchCondition: SearchType = {
      ...parsedSearchCondition,
      orderTerm: newSortBy,
    };
    dispatch(getBooksSearchRequest(updatedSearchCondition));
  };

  const getTitle = (parsedSearchCondition: SearchType) => {
    if (parsedSearchCondition.searchTerm) {
      return parsedSearchCondition.searchTerm + ` 의 검색 결과 총 ${resultCount}건`;
    } else {
      const resultString = Object.entries(parsedSearchCondition)
        .filter(([key, value]) => value !== '' && key !== 'page' && key !== 'pageSize' && key !== 'orderTerm')
        .map(([_, value]) => `${value}`)
        .join(' + ');
      return (
        <span>
          <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{resultString}</span> 검색 결과 총{' '}
          <span style={{ fontWeight: 'bold' }}>{resultCount}</span>건
        </span>
      );
    }
  };

  const pageTitle = getTitle(parsedSearchCondition);
  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px', // 'mb' 대신 표준 CSS 속성 사용
  };
  const toggleBoxStyle = {
    borderBottom: '0.5px solid #ccc',
    paddingBottom: '0px',
  };
  const toggleButtonStyle = {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
  };
  const actionButtonNames = ['전체 선택', '장바구니 담기', '보관함 담기', '마이리스트 담기'];
  const handleOnClick = (name: string) => {
    console.log('handleOnClick.', name);
    switch (name) {
      case '전체 선택': {
        if (selectedBooks.length === books.length) {
          setSelectedBooks([]);
        } else {
          setSelectedBooks(books.map((book) => book.id));
        }
      }
    }
  };
  const disabledButtons = (name: string): boolean => {
    if (name === '전체 선택') {
      return false;
    } else {
      return selectedBooks.length === 0;
    }
  };

  return (
    <Container
      className="search-result-books-container"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        paddingLeft: '0px',
        paddingRight: '0px',
        marginTop: '20px',
      }}>
      {books.length > 0 ? (
        <>
          <Box display="flex" alignItems="center" justifyContent="left" mt={6} mb={0.2}>
            <Typography color="textPrimary" sx={{ color: 'gray' }}>
              {pageTitle}
            </Typography>
          </Box>
          <ToggleButtons sortBy={sortBy} handleSortChange={() => handleSortChange} boxStyle={toggleBoxStyle} buttonStyle={toggleButtonStyle} />
          <CustomPagination pageCount={pageCount} currentPage={currentPage} handlePageChange={() => handlePageChange} style={paginationStyle} />
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: '12px', marginBottom: '20px' }}>
            <ActionButtons names={actionButtonNames} handleOnClick={handleOnClick} disabledButtons={disabledButtons} />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <ResultFilters />
            </Grid>
            <Grid item xs={12} md={9}>
              <Box className="book-card-box" sx={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem' }}>
                {books.map((book, index) => (
                  <Box className="book-detail-card" key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', zIndex: 'revert-layer' }}>
                    <Checkbox checked={selectedBooks.includes(book.id)} onChange={() => handleCheckboxChange(book.id)} />
                    <BookDetailCard key={index} book={book} />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h6">검색 결과가 없습니다.</Typography>
        </Box>
      )}
    </Container>
  );
};

export default SearchResultBooksContainer;
