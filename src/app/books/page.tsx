'use client';
import { useEffect } from 'react';

import { Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooksRequest } from '../actions/types';
import BooksContainer from '../components/Book/BooksContainer';
import { RootState } from '../reducers';
import { AppDispatch } from '../store/store';

const Books = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books } = useSelector((store: RootState) => store.book);

  useEffect(() => {
    dispatch(getAllBooksRequest());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3" component="div">
        All books
      </Typography>
      <Container data-testid="books-container" sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <BooksContainer books={books} />
      </Container>
    </>
  );
};

export default Books;
