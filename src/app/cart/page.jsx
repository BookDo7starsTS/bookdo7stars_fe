'use client';

import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Card, CardContent, Typography, Button, IconButton, Grid, Checkbox } from '@mui/material';

import CartCard from '../components/Cart/CartCard';

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [checked, setChecked] = useState(false);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleDelete = () => {
    console.log('Item deleted'); // Replace this with your delete logic
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleToggleSelectAll = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ mt: '50px' }} p={2} maxWidth="800px" mx="auto">
      {/* Select All / Deselect All Button */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="outlined" onClick={handleToggleSelectAll}>
          {checked ? '전체 해제' : '전체 선택'}
        </Button>
      </Box>

      {/* Cart Item */}
      <CartCard
        quantity={quantity}
        checked={checked}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onDelete={handleDelete}
        onCheckboxChange={handleCheckboxChange}
      />
      <CartCard
        quantity={quantity}
        checked={checked}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onDelete={handleDelete}
        onCheckboxChange={handleCheckboxChange}
      />

      {/* Summary Section */}
      <Box sx={{ border: '1px solid #ccc', borderRadius: 1, mb: 2, p: 2, backgroundColor: '#f9f9f9' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              총 상품가격: <b>13,500원</b> (1,500원 할인)
            </Typography>
            <Typography>
              배송비: <b>2,500원</b>
            </Typography>
            <Typography>
              총 주문 상품수: <b>{quantity}개</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              멤버십 마일리지: <b>0원</b>
            </Typography>
            <Typography>
              상품 마일리지: <b>750원</b> (5%)
            </Typography>
            <Typography color="primary">
              5만 원 이상 추가 마일리지: <b>0원</b>
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, borderTop: '1px solid #ddd', pt: 2 }}>
          <Typography variant="h6">
            총 결제 예상 금액: <b>16,000원</b>
          </Typography>
          <Typography variant="h6">
            총 적립 예상 마일리지: <b>750원</b>
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary">
          이 장바구니의 선택 상품만 주문
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
