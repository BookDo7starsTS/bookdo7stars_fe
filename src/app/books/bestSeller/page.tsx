'use client';
import { useEffect, useState } from 'react';

import { getBestsellerRequest, resetBooks } from '@/app/actions/types';
import { RootState } from '@/app/reducers';
import { Button, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import BestSellerContainer from '../../components/Book/BestSellerContainer';
import { AppDispatch } from '../../store/store';

const BestSeller = () => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { books } = useSelector((state: RootState) => state.book);

  useEffect(() => {
    dispatch(resetBooks());
    dispatch(getBestsellerRequest('Bestseller', page, 20));
  }, []);

  const handleClick = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(getBestsellerRequest('Bestseller', page, 20));
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <BestSellerContainer books={books} title={'Bestseller'} />
      <Button onClick={handleClick}>Load more</Button>
    </Container>
  );
};

export default BestSeller;
