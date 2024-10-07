'use client';
import { useEffect } from 'react';

import { RootState } from '@/app/reducers';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../store/store';

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {}, []);

  return (
    <div>
      <h1> 상세검색페이지 </h1>
    </div>
  );
};

export default SearchPage;
