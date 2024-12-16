import { Box, IconButton, ListItem, ListItemText, SxProps, useTheme } from '@mui/material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { CategoryById } from '@/app/models/category';
import { AppDispatch } from '@/app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/app/reducers';
import React from 'react';

type CategoryListItemProps = {
  category: CategoryById;
  expandedIds: string[];
  categoryId: string;
  onExpandCategory: (id: string) => void;
  handleOnClickCategory: (id: number) => void;
  style?: SxProps;
};

const CategoryListItem = (props: CategoryListItemProps) => {
  const { category, expandedIds, categoryId, onExpandCategory, handleOnClickCategory, style } = props;
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  return (
    <ListItem key={category.id} sx={{ ...style }}>
      {category.count && category.count > 0 ? (
        <IconButton sx={{ padding: '0.5rem' }} aria-label="expand category" onClick={() => onExpandCategory(category.id.toString())}>
          <ArrowForwardIosOutlinedIcon
            sx={{
              transform: expandedIds.includes(category.parent_id.toString()) || expandedIds.includes(category.id.toString()) ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          />
        </IconButton>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RemoveOutlinedIcon sx={{ width: '1.5rem', height: '1rem' }} />
        </Box>
      )}
      <ListItemText
        id={category.id.toString()}
        primary={category.name}
        onClick={() => handleOnClickCategory(category.id)}
        sx={{
          cursor: 'pointer',
          backgroundColor: category.id.toString() === categoryId ? theme.palette.primary.light : 'transparent',
          fontWeight: category.id.toString() === categoryId ? 'bold' : 'normal',
        }}
      />
    </ListItem>
  );
};

export default CategoryListItem;
