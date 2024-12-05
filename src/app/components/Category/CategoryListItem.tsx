import { IconButton, ListItem, ListItemText, SxProps } from '@mui/material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { CategoryById } from '@/app/models/category';
import { AppDispatch } from '@/app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryIdRequestAction } from '@/app/actions/types';
import { useRouter } from 'next/navigation';
import { RootState } from '@/app/reducers';
import React from 'react';

type CategoryListItemProps = {
  category: CategoryById;
  expandedIds: string[];
  onExpandCategory: (id: string) => void;
  handleOnClickCategory: (id: number) => void;
  style?: SxProps;
};

const CategoryListItem = (props: CategoryListItemProps) => {
  const { category, expandedIds, onExpandCategory, handleOnClickCategory, style } = props;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <ListItem key={category.id} sx={{ ...style }}>
      {category.count > 0 && (
        <IconButton sx={{ padding: '0.5rem' }} aria-label="expand category" onClick={() => onExpandCategory(category.id.toString())}>
          <ArrowForwardIosOutlinedIcon
            sx={{ transform: expandedIds.includes(category.id.toString()) ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
          />
        </IconButton>
      )}
      <ListItemText id={category.id.toString()} primary={category.name} onClick={() => handleOnClickCategory(category.id)} sx={{ cursor: 'pointer' }} />
    </ListItem>
  );
};

export default React.memo(CategoryListItem);
