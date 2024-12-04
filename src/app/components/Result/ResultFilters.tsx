import { useState } from 'react';

import { Container, Box, Typography, Slider, Button } from '@mui/material';

const ResultFilters = () => {
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
    console.log('Applied Filters', filters);
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
