import { useEffect, useState } from 'react';

import { getCategoryRequest } from '@/app/actions/types';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, MenuItem, Box, IconButton, useTheme, useMediaQuery, Grid, Paper, Link } from '@mui/material';
import { display } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { QueryTypes, bookGroups, getBooksPageURL } from '../books/constants';

const CategoryBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { categories } = useSelector((store: RootState) => store.category);
  const [expandedId, setExpandedId] = useState(-1);
  const [isCategoryVisible, setCategoriesVisible] = useState(false);

  const handleExpandableToggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? -1 : id));
  };

  const handlePopperClick = () => {
    // 팝오버 열기 로직 추가
  };

  const handlePopperClose = () => {
    // 팝오버 닫기 로직 추가
  };

  const handleCategoryClick = () => {
    if (categories.length === 0) dispatch(getCategoryRequest(3));
    setCategoriesVisible((prev) => (prev = !prev));
  };

  const queryTypes: QueryTypes[] = [
    QueryTypes.All,
    QueryTypes.ItemNewAll,
    QueryTypes.ItemNewSpecial,
    QueryTypes.Bestseller,
    QueryTypes.BlogBest,
    QueryTypes.ItemEditorChoice,
  ];

  const getGroups = (queryTypes: QueryTypes[], bookGroups: Record<string, string>): string[] => {
    const groups: string[] = [];
    queryTypes.forEach((q) => {
      if (bookGroups[q]) {
        groups.push(bookGroups[q]);
      }
    });
    return groups;
  };

  const groups = getGroups(queryTypes, bookGroups);

  const goToBookGroupPage = (group: string) => {
    router.push(getBooksPageURL(group));
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '2px solid #035036', borderTop: '2px solid #035036' }}>
        <Toolbar sx={{ padding: { xs: '0 8px', sm: '0 16px' } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}>
            <Box
              sx={{
                display: isMobile ? 'grid' : 'flex',
                gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'none',
                gap: 1,
                flexWrap: isMobile ? 'none' : 'wrap',
                width: '100%',
              }}>
              {groups.map((group, index) => (
                <MenuItem key={index} onClick={() => goToBookGroupPage(group)}>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.9rem' },
                      cursor: 'pointer',
                      color: '#035036',
                      fontWeight: 'bold',
                    }}>
                    {group}
                  </Typography>
                </MenuItem>
              ))}
            </Box>
            <Box>
              <IconButton
                onClick={handlePopperClick}
                sx={{
                  color: 'primary.main',
                  width: { xs: 40, sm: 50 },
                  height: { xs: 40, sm: 50 },
                  '&:hover': { backgroundColor: 'primary.light' },
                }}>
                <MenuIcon onClick={handleCategoryClick} />
              </IconButton>
            </Box>
            {isCategoryVisible && (
              <Paper
                style={{
                  position: 'absolute',
                  top: '50px',
                  left: '10px',
                  right: '10px',
                  padding: '30px',
                  zIndex: 1000,
                }}
                elevation={3}>
                <Grid container spacing={3}>
                  {categories.map((obj) => (
                    <Grid key={obj.id} item xs={12} sm={6} md={4} lg={2}>
                      <Link href="{obj.id}">{obj.name}</Link>
                      {obj.children.length > 0 && (
                        <ExpandMoreIcon
                          onClick={() => handleExpandableToggle(obj.id)}
                          style={{
                            position: 'relative',
                            top: '5px',
                            transform: expandedId === obj.id ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s',
                          }}
                        />
                      )}
                      {obj.children.map((child) => (
                        <div
                          key={child.id}
                          style={{
                            height: expandedId === obj.id ? 'auto' : 0,
                            transition: 'opacity 0.5s ease-in-out',
                            overflow: 'hidden',
                            opacity: expandedId === obj.id ? 1 : 0,
                          }}>
                          <Link href="{child.id}" underline="none" style={{ fontSize: '10pt', color: 'black' }}>
                            {child.name}
                          </Link>
                        </div>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CategoryBar;
