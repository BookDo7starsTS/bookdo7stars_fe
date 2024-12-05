'use client';
import { useEffect, useState } from 'react';

import {
  getCategoryByIdRequest,
  getCategoryRequest,
  resetCategoryByIdRequest,
  setCategoryIdRequestAction,
  setExpandedCategoryIdsRequestAction,
} from '@/app/actions/types';
import { Category, CategoryById } from '@/app/models/category';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box, IconButton, List, ListItem, ListItemText, Popover } from '@mui/material';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CategoryListItem from './CategoryListItem';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

type CategoryListProps = {
  categories: Record<string, CategoryById[]>;
  categoryId: string;
  allSubCategoryIds: string[];
};

const CategoryList = (props: CategoryListProps) => {
  const { categories, categoryId, allSubCategoryIds } = props;
  const { expandedIds } = useSelector((store: RootState) => store.category);
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useDispatch<AppDispatch>();

  const onExpandCategory = (id: string) => {
    if (expandedIds.includes(id)) {
      dispatch(setExpandedCategoryIdsRequestAction(expandedIds.filter((expandedId) => expandedId !== id)));
      return;
      // dispatch(resetCategoryByIdRequest(id.toString()));
    }
    if (!categories[id]) {
      console.log('asdfasdfasdfasdf');
      dispatch(getCategoryByIdRequest(id.toString()));
    }
    dispatch(setExpandedCategoryIdsRequestAction([...expandedIds, id]));
    // dispatch(getCategoryByIdRequest(id.toString()));
  };

  console.log(categories);
  console.log(expandedIds);

  const handleOnClickCategory = (id: number) => {
    router.push(`/books/category/${id}`);
  };
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {categories[categoryId] &&
        categories[categoryId].map((cat) => {
          return (
            <React.Fragment key={cat.id}>
              <CategoryListItem
                category={cat}
                expandedIds={expandedIds}
                onExpandCategory={onExpandCategory}
                handleOnClickCategory={handleOnClickCategory}
                style={{ padding: '0.25rem' }}
              />
              {expandedIds.includes(cat.id.toString()) &&
                categories[cat.id]?.map((subCat) => (
                  <CategoryListItem
                    key={subCat.id}
                    category={subCat}
                    expandedIds={expandedIds}
                    onExpandCategory={onExpandCategory}
                    handleOnClickCategory={handleOnClickCategory}
                    style={{ padding: '0 0 0 4rem' }}
                  />
                ))}
            </React.Fragment>
          );
        })}
    </List>
  );
};

export default React.memo(CategoryList);
