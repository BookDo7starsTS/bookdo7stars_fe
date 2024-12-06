import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_BOOKS_SEARCH_REQUEST } from '../../actions/constants/book' // 액션 정의된 경로
import { RootState } from '@/app/reducers';

import { Container, Box, Typography, Slider, Button } from '@mui/material';

const ResultFilters = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((store: RootState) => store.book.searchData);
  const [filters, setFilters] = useState({
    dateRange: [3, 60], // Represents the values in months (3M to 60M or 전체)
    priceRange: [10000, 30000],
  });

  // Marks for the date range slider
  const dateRangeMarks = [
    { value: 10, label: '3M' },
    { value: 20, label: '12M' },
    { value: 30, label: '24M' },
    { value: 40, label: '36M' },
    { value: 50, label: '60M' },
    { value: 60, label: '전체' },
  ];

  const handleSliderChange = (name: string) => (event: Event, value: number | number[]) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const [startMonths] = filters.dateRange;
    const today = new Date();
  
    // 시작 날짜 계산
    // const startDate = new Date(today);
    // startDate.setMonth(today.getMonth() - startMonths); // startMonths 만큼 월을 빼서 설정
    const startDateISO = "2024-09-05"
  
    // 종료 날짜 계산
    const endDateISO = today.toISOString().split('T')[0];
  
    // Redux Dispatch
    dispatch({
      type: GET_BOOKS_SEARCH_REQUEST,
      data: {
        ...searchData, 
          start_date: startDateISO,
          end_date: endDateISO,
          start_price: filters.priceRange[0],
          end_price: filters.priceRange[1]
      },
    });
  
    console.log('Applied Filters:', {
      dateRange: [startDateISO, endDateISO],
      priceRange: filters.priceRange,
    });
  };


  return (
    <Container>
      <Box>
        <Typography variant="h6" mb={2}>
          필터링
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography>출간일</Typography>
        <Slider
          value={filters.dateRange}
          onChange={handleSliderChange('dateRange')}
          //   valueLabelDisplay="auto"
          min={10}
          max={60} // The maximum value corresponds to '전체'
          step={null} // Makes the slider snap to marks only
          marks={dateRangeMarks}
        />
      </Box>
      <Box mb={2}>
        <Typography>판매가</Typography>
        <Slider value={filters.priceRange} onChange={handleSliderChange('priceRange')} valueLabelDisplay="auto" min={10000} max={30000} />
      </Box>

      <Button variant="contained" color="primary" onClick={applyFilters} fullWidth>
        적용
      </Button>
    </Container>
  );
};

export default ResultFilters;
