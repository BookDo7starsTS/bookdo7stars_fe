'use client';

import { useEffect, useState } from 'react';

import { getAllBooksRequest, GetCategoriesByIdRequest, GetCategoryByIdRequest, getCategoryRequest, setAllSubCategoryIdsRequest } from '@/app/actions/types';
import SearchResultBooksContainer from '@/app/components/Book/SearchResultBooksContainer';
import CategoryList from '@/app/components/Category/CategoryList';
import { Category } from '@/app/models/category';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useParams, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesById, GetCategoryById } from '@/app/sagas/category';

const CategoryBookPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesById, selectedCategory } = useSelector((store: RootState) => store.category);
  const { books, count, isGetAllBooksLoading } = useSelector((store: RootState) => store.book);
  const theme = useTheme();

  const { categoryId } = useParams<{ categoryId: string }>();

  const [page, setPage] = useState(1);
  const pathname = usePathname();

  useEffect(() => {
    if (!categoriesById[categoryId]) {
      dispatch(GetCategoriesByIdRequest(categoryId));
    }
  }, [categoriesById, dispatch]);

  const booksPerPage = 20;
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(GetCategoryByIdRequest(categoryId));
    }
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: '1rem', marginLeft: 0, marginTop: '1rem' }}>
      <Grid item xs={4} sx={{ padding: '0 !important', marginLeft: '1rem' }} className="category-list">
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0px 4px 10px #AFC6AA', borderRadius: '4px', minWidth: '350px' }}>
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            {selectedCategory ? selectedCategory.name : '찾으시는 카테고리는 없습니다.'}
          </Typography>
        </Box>
        <Box
          sx={{
            boxShadow: '0px 4px 10px #AFC6AA',
            borderRadius: '4px',
            maxWidth: '500px',
            minWidth: '350px',
            maxHeight: '800px',
            overflowY: 'auto',
          }}
          className="category-list">
          <CategoryList categories={categoriesById} categoryId={categoryId} />
        </Box>
      </Grid>
      <Grid item xs={8}></Grid>
    </Grid>
  );
};
export default CategoryBookPage;
