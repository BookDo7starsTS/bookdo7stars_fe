'use client';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getAllBooksRequest } from '../../actions/types';
import BookDetailContainer from '../../components/BookDetail/BookDetailContainer';
import { AppDispatch } from '../../store/store';

const BookDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllBooksRequest());
  }, []);

  return (
    <div>
      왜 뭔가 나왔어야 했는데 안 나왔을까?
      <BookDetailContainer />
    </div>
  );
};

export default BookDetailPage;
