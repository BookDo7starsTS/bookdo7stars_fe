'use client';

import React, { useState } from 'react';

import { alpha, Box, Button, Container, styled, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import CustomTable from '../components/Order/CustomTable';
import { RootState } from '../reducers';
import AddressForm from '../components/Order/AddressForm';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  [theme.breakpoints.up('md')]: {
    width: '120px',
    height: '40px',
  },
}));
const OrderPage = () => {
  const { selectedItems } = useSelector((store: RootState) => store.cart);
  const [isTableExpanded, setIsTableExpanded] = useState<boolean>(false);

  const expandTable = () => {
    setIsTableExpanded((prev) => !prev);
  };

  return (
    <Container
      className="all-books-container"
      sx={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      {selectedItems.length > 0 ? (
        <Box>
          <Box sx={{ margin: '1rem 0rem', display: 'flex', justifyContent: 'flex-end' }}>
            <StyledButton onClick={expandTable}>{isTableExpanded ? '접기' : '더보기'}</StyledButton>
          </Box>
          <Box>
            <CustomTable items={selectedItems} isTableExpanded={isTableExpanded} />
          </Box>
        </Box>
      ) : (
        <Typography> 주문 내역이 없습니다.</Typography>
      )}
      <AddressForm />
    </Container>
  );
};

export default OrderPage;
