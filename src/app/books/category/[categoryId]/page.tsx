'use client';

import { useEffect, useState } from 'react';

import { getAllBooksRequest, getCategoryRequest } from '@/app/actions/types';
import SearchResultBooksContainer from '@/app/components/Book/SearchResultBooksContainer';
import CategoryList from '@/app/components/Category/CategoryList';
import { Category } from '@/app/models/category';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const CategoryBookPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((store: RootState) => store.category);
  const { books, count, isGetAllBooksLoading } = useSelector((store: RootState) => store.book);

  const { categoryId } = useParams<{ categoryId: string }>();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCategoryRequest(3));
  }, []);

  const transformData = (data: Category[]): any[] =>
    data.map((item: Category) => ({
      title: item.name,
      key: item.id,
      children: item.children ? transformData(item.children) : [],
    }));
  const treeData = categories.length > 0 ? transformData(categories) : [];
  const booksPerPage = 20;
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Grid container spacing={2} sx={{ padding: '1rem', marginTop: '2rem' }}>
      <Grid item xs={3} sx={{ padding: '1rem', border: '1px solid' }}>
        <CategoryList categoryId={categoryId} treeData={treeData} />
      </Grid>
      <Grid item xs={9}></Grid>
    </Grid>
  );
};
export default CategoryBookPage;
