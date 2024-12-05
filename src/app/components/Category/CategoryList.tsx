'use client';
import { useEffect, useState } from 'react';

import { getCategoryByIdRequest, getCategoryRequest } from '@/app/actions/types';
import { Category, CategoryById } from '@/app/models/category';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box, IconButton, List, ListItem, ListItemText, Popover } from '@mui/material';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

type CategoryListProps = {
  categories: Record<string, CategoryById[]>;
  categoryId: string;
};

const CategoryList = (props: CategoryListProps) => {
  const { categories, categoryId } = props;
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesById: subCategoriesOfId } = useSelector((store: RootState) => store.category);

  const router = useRouter();

  const onExpandCategory = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((expandedId) => expandedId !== id));
      // dispatch(resetCategoryByIdRequest(id.toString()));
    } else {
      setExpandedIds([...expandedIds, id]);
      dispatch(getCategoryByIdRequest(id.toString()));
    }
  };
  // const open = Boolean(anchorEl);
  // const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
  //   setAnchorEl(event.currentTarget);
  //   setHoveredId(id);
  //   dispatch(getCategoryByIdRequest(id.toString()));
  // };
  // const handlePopoverClose = () => {
  //   setAnchorEl(null);
  // };
  console.log(categories);
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {categories[categoryId] &&
        categories[categoryId].map((cat) => {
          return (
            <ListItem key={cat.id} sx={{ padding: '0.25rem' }}>
              {cat.count > 0 && (
                <IconButton sx={{ padding: '0.5rem' }} aria-label="expand category" onClick={() => onExpandCategory(cat.id)}>
                  <ArrowForwardIosOutlinedIcon
                    sx={{ transform: expandedIds.includes(cat.id) ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                  />
                </IconButton>
              )}
              {/* <Popover
                id="mouse-over-popover"
                sx={{ pointerEvents: 'none' }}
                open={open && hoveredId === cat.id}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus>
                {hoveredId &&
                  categories[hoveredId]
                    .filter((subcat) => subcat.parent_id === cat.id)
                    .map((subcat) => {
                      return (
                        <ListItem key={subcat.id} sx={{ padding: '0.25rem' }}>
                          <ListItemText id={subcat.id.toString()} primary={subcat.name} />
                        </ListItem>
                      );
                    })}
              </Popover> */}
              <ListItemText id={cat.id.toString()} primary={cat.name} />
            </ListItem>
          );
        })}
    </List>
  );
};

export default CategoryList;
// aria-owns={open && hoveredId === cat.id ? 'mouse-over-popover' : undefined}
//               aria-haspopup="true"
//               onMouseEnter={(e: React.MouseEvent<HTMLElement>) => handlePopoverOpen(e, cat.id)}
//               onMouseLeave={handlePopoverClose}
