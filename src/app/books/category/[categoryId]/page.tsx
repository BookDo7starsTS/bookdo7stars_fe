'use client';

import { getAllCategoriesRequest } from '@/app/actions/types';
import CategoryList from '@/app/components/Category/CategoryList';
import { Category } from '@/app/models/category';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Container, Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CategoryBookPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((store: RootState) => store.category);

  const { categoryId } = useParams<{ categoryId: string }>();
  useEffect(() => {
    dispatch(getAllCategoriesRequest(3));
  }, []);

  const transformData = (data: Category[]): any[] =>
    data.map((item: Category) => ({
      title: item.name,
      key: item.id,
      children: item.children ? transformData(item.children) : [],
      route: item.route,
      level: item.level,
    }));
  const treeData = categories.length > 0 ? transformData(categories) : [];

  return (
    <Grid container spacing={2} sx={{ padding: '1rem', marginTop: '2rem' }}>
      <Grid item xs={3} sx={{ padding: '1rem', border: '1px solid' }}>
        <CategoryList categoryId={categoryId} treeData={treeData} />
      </Grid>
      <Grid item xs={9}>
        <span>{categoryId} 카테고리별 책 페이지</span>
      </Grid>
    </Grid>
  );
};
export default CategoryBookPage;
