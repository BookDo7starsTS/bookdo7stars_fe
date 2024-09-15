'use client';

import { useEffect, useState } from 'react';

import { getBooksByGroupRequest } from '@/app/actions/types';
import GroupBooksContainer from '@/app/components/Book/GroupBooksContainer';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const BlogBest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const { groupBooks, pageSize, isGetBooksByGroupLoading } = useSelector((store: RootState) => store.book);

  const handleSeeMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(getBooksByGroupRequest({ groupName: 'BlogBest', page: page, pageSize: pageSize }));
  }, [page]);

  return (
    <>
      <Container data-testid="books-group-container" sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <GroupBooksContainer books={groupBooks} title={'Blog Best Books'} handleSeeMore={handleSeeMore} isGetBooksByGroupLoading={isGetBooksByGroupLoading} />
      </Container>
    </>
  );
};

export default BlogBest;
