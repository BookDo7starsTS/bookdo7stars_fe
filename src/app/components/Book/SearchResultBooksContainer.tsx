import { useState, useEffect } from 'react';

import { Container, Typography, Grid, Box, Pagination, Checkbox, Button } from '@mui/material';

import SearchResultBookCard from './SearchResultBookCard';
import { Book } from '../../models/book';

interface BookContainerProps {
  books: Book[];
  title: string;
  count: number;
  booksPerPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  currentPage: number;
}

const SearchResultBooksContainer: React.FC<BookContainerProps> = ({ books, count, title, handlePageChange, booksPerPage, currentPage }) => {
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const handleSelectAll = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]); // 전체 해제
    } else {
      setSelectedBooks(books.map((book) => book.id));
    }
  };

  useEffect(() => {
    console.log("선택된 책들: ", selectedBooks);
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
    setSelectedBooks(
      (prevSelectedBooks) =>
        prevSelectedBooks.includes(bookId)
          ? prevSelectedBooks.filter((id) => id !== bookId) // 선택 해제
          : [...prevSelectedBooks, bookId], // 선택 추가
    );
  };

  const pageCount = Math.ceil(count / booksPerPage);
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        paddingLeft: '0px',
        paddingRight: '0px',
        marginTop: '20px',
      }}>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Typography variant="h3" component="div" gutterBottom sx={{ width: '400px', height: '60px', fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
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
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'end', justifyContent: 'end', gap: '12px', marginBottom: '20px' }}>
        <Button variant="outlined" onClick={handleSelectAll}>
          {selectedBooks.length === books.length ? '전체 해제' : '전체 선택'}
        </Button>
        <Button variant="outlined" onClick={handleAddToCart} disabled>
          {'장바구니 담기'}
        </Button>
        <Button variant="outlined" onClick={handleAddToWishlist} disabled>
          {'보관함 담기'}
        </Button>
        <Button variant="outlined" onClick={handleAddToMyList} disabled>
          {'마이리스트 담기'}
        </Button>
      </Box>
      <Box>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {books.map((book, index) => (
            <Grid
              data-testid="book-card"
              key={index}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ paddingY: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={selectedBooks.includes(book.id)} onChange={() => handleCheckboxChange(book.id)} />
                <SearchResultBookCard key={index} book={book} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SearchResultBooksContainer;
