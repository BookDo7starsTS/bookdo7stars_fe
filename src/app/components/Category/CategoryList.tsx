'use client';
import { useEffect, useState } from 'react';

import {
  getCategoryByIdRequest,
  getCategoryRequest,
  resetCategoryByIdRequest,
  setExpandedCategoryIdsRequest,
  setSelectedCategoryIdsRequest,
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
};

const CategoryList = (props: CategoryListProps) => {
  const { categories, categoryId } = props;
  const { expandedIds, selectedCategoryIds } = useSelector((store: RootState) => store.category);
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useDispatch<AppDispatch>();

  console.log(expandedIds);
  const onExpandCategory = (id: string) => {
    if (!categories[id] || categories[id].length === 0) {
      console.log('asdfasdfasdfasdf');
      dispatch(getCategoryByIdRequest(id.toString()));
    }

    if (expandedIds.includes(id)) {
      dispatch(setExpandedCategoryIdsRequest(expandedIds.filter((expandedId) => expandedId !== id)));
    } else {
      dispatch(setExpandedCategoryIdsRequest([...expandedIds, id]));
    }
  };

  const handleOnClickCategory = (id: number) => {
    dispatch(setSelectedCategoryIdsRequest(id.toString()));
    onExpandCategory(id.toString());
    router.push(`/books/category/${id}`);
  };
  console.log(expandedIds);
  console.log('selectedCategoryIds, ', selectedCategoryIds);
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {selectedCategoryIds.map((id) => {
        if (!categories[id]) return null; // categories[id]가 없으면 null 반환

        return categories[id].map((cat) => (
          <React.Fragment key={cat.id}>
            <CategoryListItem
              category={cat}
              categoryId={categoryId}
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
                  categoryId={categoryId}
                  expandedIds={expandedIds}
                  onExpandCategory={onExpandCategory}
                  handleOnClickCategory={handleOnClickCategory}
                  style={{ padding: '0 0 0 4rem' }}
                />
              ))}
          </React.Fragment>
        ));
      })}
    </List>
  );
};

export default React.memo(CategoryList);
