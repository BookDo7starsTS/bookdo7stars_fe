'use client';
import { useEffect, useState } from 'react';

import { Container, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getBooksByGroupNameRequest } from '../../actions/types';
import BooksContainerForGroupName from '../../components/Book/BooksContainerForGroupName';
import { RootState } from '../../reducers';
import { AppDispatch } from '../../store/store';

const ItemNewSpecial = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { books } = useSelector((store: RootState) => store.book);
  useEffect(() => {
    dispatch(getBooksByGroupNameRequest('ItemNewAll', 1, 20));
  }, []);

  const handleClickMore = () => {
    setIsVisible(false);
    dispatch(getBooksByGroupNameRequest('ItemNewAll', 2, 20));
  };

  return (
    <>
      <Container data-testid="books-container" sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <BooksContainerForGroupName books={books} title={'Item New Special Books'} />
        {isVisible && (
          <Button size="large" onClick={handleClickMore}>
            more
          </Button>
        )}
      </Container>
    </>
  );
};

export default ItemNewSpecial;
