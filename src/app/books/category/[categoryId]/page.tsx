'use client';

import { useEffect, useState } from 'react';

import { getAllBooksRequest, getCategoryByIdRequest, getCategoryRequest } from '@/app/actions/types';
import SearchResultBooksContainer from '@/app/components/Book/SearchResultBooksContainer';
import CategoryList from '@/app/components/Category/CategoryList';
import { Category } from '@/app/models/category';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesById } from '@/app/sagas/category';

const CategoryBookPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesById } = useSelector((store: RootState) => store.category);
  const { books, count, isGetAllBooksLoading } = useSelector((store: RootState) => store.book);

  const { categoryId } = useParams<{ categoryId: string }>();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCategoryByIdRequest(categoryId));
  }, [categoryId]);

  const booksPerPage = 20;
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Grid container spacing={2} sx={{ padding: '1rem', marginLeft: 0, marginTop: '1rem' }}>
      <Grid item xs={4} sx={{ border: '1px solid', padding: '0 !important' }} className="category-list">
        <CategoryList categories={categoriesById} categoryId={categoryId} />
      </Grid>
      <Grid item xs={8}></Grid>
    </Grid>
  );
};
export default CategoryBookPage;
