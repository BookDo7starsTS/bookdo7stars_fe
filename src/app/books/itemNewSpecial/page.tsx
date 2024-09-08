'use client';
import { useEffect } from 'react';

import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getBooksByGroupNameRequest } from '../../actions/types';
import BooksContainerForGroupName from '../../components/Book/BooksContainerForGroupName';
import { RootState } from '../../reducers';
import { AppDispatch } from '../../store/store';

const ItemNewSpecial = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books } = useSelector((store: RootState) => store.book);
  console.log('books: ' + books);
  useEffect(() => {
    dispatch(getBooksByGroupNameRequest('ItemNewAll'));
  }, []);
  return (
    <>
      <Container data-testid="books-container" sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <BooksContainerForGroupName books={books} title={'Item New Special Books'} />
        <button>more</button>
      </Container>
    </>
  );
};

export default ItemNewSpecial;
