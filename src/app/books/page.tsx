'use client';

import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooksRequest } from '../actions/types';
import { RootState } from '../reducers';
import { useEffect } from 'react';
import { AppDispatch } from '../store/store';

const Books = () => {
  // load books from store
  const { books } = useSelector((store: RootState) => store.book);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // 페이지가 렌더링될 때 마다 한 번 디스패치
    dispatch(getAllBooksRequest());
  }, []);

  // action, type, reducers, sagas, store

  return (
    <>
      <Typography variant="h3" component="div">
        전체 도서
      </Typography>
      {books.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </>
  );
};

export default Books;
