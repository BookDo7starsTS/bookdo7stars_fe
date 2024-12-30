'use client';
import { useEffect, useState } from 'react';

import { Container, Box, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooksRequest } from '../actions/types';
import BooksContainer from '../components/Book/BooksContainer';
import { RootState } from '../reducers';
import { AppDispatch } from '../store/store';
import CustomPagination from '../components/CustomPagination';

const Books = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const { books, count } = useSelector((store: RootState) => store.book);
  const booksPerPage = 20;
  const pageCount = Math.ceil(count / booksPerPage);

  useEffect(() => {
    dispatch(getAllBooksRequest(page, booksPerPage));
  }, []);

  return <BooksContainer books={books} title={'All Books'} booksPerPage={booksPerPage} pageCount={pageCount} />;
};

export default Books;
