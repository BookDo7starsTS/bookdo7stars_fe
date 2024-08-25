import React, { useEffect, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, MenuItem, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
// import { useRouter } from 'next/router';

import CategoryPopOver from './CategoryPopOver';

// Props 타입 정의
interface CategoryBarProps {
  bookList: { categoryName: string }[];
}

const CategoryBar: React.FC<CategoryBarProps> = ({ bookList }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  //   const router = useRouter();
  const handlePopperClick = () => {
    // 팝오버 열기 로직 추가
  };

  const handlePopperClose = () => {
    // 팝오버 닫기 로직 추가
  };

  const queryTypes: string[] = ['ItemNewAll', 'ItemNewSpecial', 'BestSeller', 'BlogBest'];
  const bookGroups: Record<string, string> = {
    ItemNewAll: '새로 나온 책',
    ItemNewSpecial: '화제의 신간',
    BestSeller: '베스트 셀러',
    BlogBest: '블로그 베스트',
  };

  const getGroups = (queryTypes: string[], bookGroups: Record<string, string>): string[] => {
    const groups: string[] = [];
    queryTypes.forEach((q) => {
      if (bookGroups[q]) {
        groups.push(bookGroups[q]);
      }
    });
    return groups;
  };

  const groups = getGroups(queryTypes, bookGroups);

  const goToAllBooksOfGroup = (group: string) => {
    if (group === '전체도서') {
      router.push('/books/all'); //넥스트에서는 어떻게 navigate을 하나?
    } else if (group === '에디터 추천') {
      router.push('/books/editor-recommend');
    } else {
      // 다른 그룹에 대한 네비게이션 추가
    }
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '2px solid #035036', borderTop: '2px solid #035036' }}>
        <Toolbar sx={{ padding: { xs: '0 8px', sm: '0 16px' } }}>
          <Box>
            <CategoryPopOver />
          </Box>
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
                <MenuItem key={index} onClick={() => goToAllBooksOfGroup(group)}>
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
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CategoryBar;
