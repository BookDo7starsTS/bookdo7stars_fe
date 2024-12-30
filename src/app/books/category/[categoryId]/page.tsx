'use client';

import { useEffect, useState } from 'react';

import { getBooksByCategoryRequest, getCategoriesByIdRequest, getCategoryByIdRequest } from '@/app/actions/types';
import BookDetailCard from '@/app/components/Book/BookDetailCard';
import CategoryBooksContainer from '@/app/components/Book/CategoryBooksContainer';
import CategoryList from '@/app/components/Category/CategoryList';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box, Checkbox, Container, Grid, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import ActionButtons from '@/app/components/Buttons/ActionButtons';
import ToggleButtons from '@/app/components/Buttons/ToggleButtons';
import CustomPagination from '@/app/components/CustomPagination';

const CategoryBookPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesById, selectedCategory } = useSelector((store: RootState) => store.category);
  const { categoryBooks, count } = useSelector((store: RootState) => store.book);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('');

  const { categoryId } = useParams<{ categoryId: string }>();

  const [page, setPage] = useState(1);
  const booksPerPage = 20;
  const pageCount = Math.ceil(count / booksPerPage);

  useEffect(() => {
    if (!categoriesById[categoryId + ' ']) {
      dispatch(getCategoriesByIdRequest(categoryId));
    }
  }, [categoriesById, dispatch]);

  useEffect(() => {
    dispatch(getBooksByCategoryRequest({ categoryId: categoryId, page: page, pageSize: booksPerPage }));
  }, [categoryId]);

  const handleCheckboxChange = (bookId: number) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(bookId) ? prevSelectedBooks.filter((id) => id !== bookId) : [...prevSelectedBooks, bookId],
    );
  };

  const handleSortChange = (event: React.MouseEvent<HTMLElement>, newSortBy: string) => {
    setSortBy(newSortBy);
    // const updatedSearchCondition: SearchType = {
    //   ...parsedSearchCondition,
    //   orderTerm: newSortBy,
    // };
    // dispatch(getBooksSearchRequest(updatedSearchCondition));
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryByIdRequest(categoryId));
    }
  }, []);

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
    switch (name) {
      case '전체 선택': {
        if (selectedBooks.length === categoryBooks.length) {
          setSelectedBooks([]);
        } else {
          setSelectedBooks(categoryBooks.map((book) => book.id));
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
    <Grid container spacing={3} sx={{ margin: '1rem' }}>
      <Grid item xs={12} md={3} className="category-list">
        <Box sx={{ top: 0, position: 'sticky', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1rem',
              boxShadow: '0px 4px 10px #AFC6AA',
              borderRadius: '4px',
              minWidth: '250px',
              height: '80px',
              maxWidth: '350px',
            }}>
            <Typography variant="h4" style={{ fontWeight: 600 }}>
              {selectedCategory ? selectedCategory.name : '찾으시는 카테고리는 없습니다.'}
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: '0px 4px 10px #AFC6AA',
              borderRadius: '4px',
              minWidth: { xs: '200px', sm: '200px', md: '250px', lg: '250px' }, // Breakpoints에 따라 조정
              maxWidth: { xs: '300px', sm: '300px', md: '350px', lg: '350px' },
              minHeight: { xs: '400px', sm: '500px', md: '400px', lg: '800px' },
              maxHeight: { xs: '600px', sm: '700px', md: '500px', lg: '1000px' },
              overflowY: 'auto',
              marginBottom: '1rem',
            }}
            className="category-list">
            <CategoryList categories={categoriesById} categoryId={categoryId} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={8} className="category-books-container-grid">
        <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
          <Typography variant={'h4'} color="textPrimary" sx={{ color: 'gray' }}>
            {selectedCategory ? selectedCategory.name + '(' + count + ')' : '찾으시는 카테고리는 없습니다.'}
          </Typography>
        </Box>
        <ToggleButtons sortBy={sortBy} handleSortChange={() => handleSortChange} boxStyle={toggleBoxStyle} buttonStyle={toggleButtonStyle} />
        <CustomPagination pageCount={pageCount} style={paginationStyle} booksPerPage={booksPerPage} categoryId={categoryId} />
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: '12px', marginBottom: '20px' }}>
          <ActionButtons names={actionButtonNames} handleOnClick={handleOnClick} disabledButtons={disabledButtons} />
        </Box>
        <Box className="book-card-box" sx={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem' }}>
          {categoryBooks.map((book, index) => (
            <Box
              className="book-detail-card"
              key={index}
              sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', zIndex: 'revert-layer', justifyContent: 'flex-end' }}>
              <Checkbox checked={selectedBooks.includes(book.id)} onChange={() => handleCheckboxChange(book.id)} />
              <BookDetailCard key={index} book={book} />
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};
export default CategoryBookPage;
