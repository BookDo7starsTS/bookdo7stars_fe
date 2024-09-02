'use client';
import { useEffect } from 'react';

import { RootState } from '@/app/reducers';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { getBookRequest } from '../../actions/types';
import BookDetailContainer from '../../components/BookDetail/BookDetailContainer';
import { AppDispatch } from '../../store/store';

const BookDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { book } = useSelector((store: RootState) => store.book);
  const { bookId } = useParams<{ bookId: string }>();

  useEffect(() => {
    if (bookId) {
      dispatch(getBookRequest(bookId));
    }
  }, [bookId]); //dispatch 포함하라는 경고 뜸: dispatch 하나뿐이라 지금은 종속성 배열에 넣으나 안 넣으나 상관없음, ESLint는 이를 안전하게 처리하기 위해 종속성 배열에 포함하라고 경고함

  const validBook = typeof book === 'string' || Array.isArray(book) ? null : book;
  return (
    <div>
      <BookDetailContainer book={validBook} />
    </div>
  );
};

export default BookDetailPage;
