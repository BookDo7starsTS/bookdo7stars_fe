'use client';
import { useState, useEffect } from 'react';

import { RootState } from '@/app/reducers';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, Paper, TextField, Typography, ToggleButtonGroup, ToggleButton, MenuItem, Select, Divider } from '@mui/material';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../store/store';

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {}, []);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [sortOrder, setSortOrder] = useState('');
  const [isbn, setIsbn] = useState('');

  const [customDate, setCustomDate] = useState(false);
  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [endMonth, setEndMonth] = useState('');

  const handleDateRangeChange = (event, newRange) => {
    setDateRange(newRange);
    if (newRange === 'custom') {
      setCustomDate(true);
    } else {
      setCustomDate(false);
    }
  };

  const handleSearchClick = () => {
    const searchData = {
      title,
      author,
      publisher,
      dateRange,
      sortOrder,
    };
    console.log('Search Data:', searchData);
    // 실제 검색 요청 로직
  };

  const handleIsbnSearchClick = () => {
    console.log('ISBN 검색:', isbn);
    // ISBN 검색 요청 로직
  };

  return (
    <div>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Container>
          <Paper elevation={0} sx={{ p: 1 }}>
            <Box sx={{ backgroundColor: (theme) => theme.palette.third.main, display: 'flex', alignItems: 'center' }}>
              <SearchIcon sx={{ fontSize: 40, ml: 2, mr: 1 }} />
              <Typography variant="h5" sx={{ mt: 1.5, mb: 1.5, p: 0 }}>
                상세검색
              </Typography>
            </Box>
            <Box mt={2}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1" sx={{ width: '80px', ml: 3 }}>
                  제목
                </Typography>
                <TextField
                  placeholder="복합명사는 띄어쓰기 해보세요."
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ flex: 1 }}
                />
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1" sx={{ width: '80px', ml: 3 }}>
                  저자
                </Typography>
                <TextField variant="outlined" value={author} onChange={(e) => setAuthor(e.target.value)} sx={{ flex: 1 }} />
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1" sx={{ width: '80px', ml: 3 }}>
                  출판사
                </Typography>
                <TextField variant="outlined" value={publisher} onChange={(e) => setPublisher(e.target.value)} sx={{ flex: 1 }} />
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1" sx={{ width: '80px', ml: 3 }}>
                  출간일
                </Typography>
                <ToggleButtonGroup value={dateRange} exclusive onChange={handleDateRangeChange}>
                  <ToggleButton disableRipple value="all">
                    전체
                  </ToggleButton>
                  <ToggleButton disableRipple value="3months">
                    3개월
                  </ToggleButton>
                  <ToggleButton disableRipple value="6months">
                    6개월
                  </ToggleButton>
                  <ToggleButton disableRipple value="9months">
                    9개월
                  </ToggleButton>
                  <ToggleButton disableRipple value="24months">
                    24개월
                  </ToggleButton>
                  <ToggleButton disableRipple value="custom">
                    직접설정
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {/* 직접설정 선택 시 나타나는 인터벌 */}
              {customDate && (
                <Box display="flex" alignItems="center" mb={2} sx={{ ml: '101px' }}>
                  <TextField label="년" value={startYear} onChange={(e) => setStartYear(e.target.value)} sx={{ width: '100px', mr: 1 }} />
                  <Select value={startMonth} onChange={(e) => setStartMonth(e.target.value)} displayEmpty sx={{ width: '80px', mr: 2 }}>
                    <MenuItem value="" disabled>
                      월
                    </MenuItem>
                    {[...Array(12).keys()].map((month) => (
                      <MenuItem key={month + 1} value={month + 1}>
                        {String(month + 1).padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="body2">월부터</Typography>

                  <TextField label="년" value={endYear} onChange={(e) => setEndYear(e.target.value)} sx={{ width: '100px', ml: 2, mr: 1 }} />
                  <Select value={endMonth} onChange={(e) => setEndMonth(e.target.value)} displayEmpty sx={{ width: '80px', mr: 1 }}>
                    <MenuItem value="" disabled>
                      월
                    </MenuItem>
                    {[...Array(12).keys()].map((month) => (
                      <MenuItem key={month + 1} value={month + 1}>
                        {String(month + 1).padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="body2">월까지</Typography>
                </Box>
              )}

              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1" sx={{ width: '80px', ml: 3 }}>
                  정렬순서
                </Typography>
                <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} displayEmpty sx={{ flex: 1 }}>
                  <MenuItem value="" disabled>
                    정렬순서
                  </MenuItem>
                  <MenuItem value="accuracy">정확도순</MenuItem>
                  <MenuItem value="sales">판매량순</MenuItem>
                  <MenuItem value="publication">출간일순</MenuItem>
                  <MenuItem value="name">상품명순</MenuItem>
                  <MenuItem value="rating">평점순</MenuItem>
                  <MenuItem value="reviews">리뷰순</MenuItem>
                  <MenuItem value="lowPrice">저가격순</MenuItem>
                </Select>
              </Box>

              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  disableRipple
                  variant="contained"
                  color="success"
                  onClick={handleSearchClick}
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                  }}>
                  찾기
                </Button>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1" gutterBottom sx={{ width: '90px', ml: 3 }}>
                  ISBN 검색
                </Typography>
                <TextField
                  fullWidth
                  placeholder="-없이 숫자만 입력하세요."
                  variant="outlined"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  sx={{ mr: 1 }}
                />
                <Button
                  disableRipple
                  variant="contained"
                  color="success"
                  onClick={handleIsbnSearchClick}
                  sx={{
                    mt: 0,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                    height: '40px',
                  }}>
                  찾기
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default SearchPage;
