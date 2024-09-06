'use client';
import { useEffect } from 'react';

import { RootState } from '@/app/reducers';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { getBookRequest } from '../../actions/types';
import BookDetailContainer from '../../components/BookDetail/BookDetailContainer';
import BookDetailContainer2 from '../../components/BookDetail/BookDetailContainer2';
import { AppDispatch } from '../../store/store';

const BookDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { book } = useSelector((store: RootState) => store.book);
  const { bookId } = useParams<{ bookId: string }>();

  useEffect(() => {
    if (bookId) {
      dispatch(getBookRequest(bookId));
    }
  }, [bookId]);

  const validBook = typeof book === 'string' || Array.isArray(book) ? null : book;
  return (
    <div>
      <BookDetailContainer book={validBook} />
      <BookDetailContainer2 book={validBook} />
    </div>
  );
};

export default BookDetailPage;
