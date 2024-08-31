'use client';
import { useEffect } from 'react';

import { Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { getAllBooksRequest } from '../actions/types';
import BooksContainer from '../components/Book/BooksContainer';
import { AppDispatch } from '../store/store';

const Books = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllBooksRequest());
  }, []);

  return (
    <>
      <Typography variant="h3" component="div">
        All books
      </Typography>
      <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <BooksContainer />
      </Container>
    </>
  );
};

export default Books;