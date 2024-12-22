'use client';

import { useEffect, useState } from 'react';

import { getBooksByCategoryRequest, GetCategoriesByIdRequest, GetCategoryByIdRequest } from '@/app/actions/types';
import CategoryBooksContainer from '@/app/components/Book/CategoryBooksContainer';
import CategoryList from '@/app/components/Category/CategoryList';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box, Grid, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const CategoryBookPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesById, selectedCategory } = useSelector((store: RootState) => store.category);
  const { categoryBooks, count } = useSelector((store: RootState) => store.book);

  const { categoryId } = useParams<{ categoryId: string }>();

  const [page, setPage] = useState(1);
  const booksPerPage = 20;

  useEffect(() => {
    if (!categoriesById[categoryId]) {
      dispatch(GetCategoriesByIdRequest(categoryId));
    }
  }, [categoriesById, dispatch]);

  useEffect(() => {
    dispatch(getBooksByCategoryRequest({ categoryId: categoryId, page: page, pageSize: booksPerPage }));
  }, [categoryId]);

  console.log('categoryBooks', categoryBooks);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(GetCategoryByIdRequest(categoryId));
    }
  }, []);

  return (
    <Grid container spacing={3} sx={{ marginLeft: 0, marginTop: '1rem' }}>
      <Grid item xs={2} sm={4} md={4} sx={{ padding: '0 !important', marginLeft: '1rem' }} className="category-list">
        <Box sx={{ top: 0, position: 'sticky', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '10rem' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1rem',
              boxShadow: '0px 4px 10px #AFC6AA',
              borderRadius: '4px',
              minWidth: '350px',
              height: '80px',
              maxWidth: '500px',
            }}>
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
              minHeight: '800px',
              maxHeight: '1200px',
              overflowY: 'auto',
            }}
            className="category-list">
            <CategoryList categories={categoriesById} categoryId={categoryId} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={9} sm={6} md={6}>
        <CategoryBooksContainer
          categoryBooks={categoryBooks}
          count={count}
          handlePageChange={handlePageChange}
          booksPerPage={booksPerPage}
          currentPage={page}
        />
      </Grid>
    </Grid>
  );
};
export default CategoryBookPage;
