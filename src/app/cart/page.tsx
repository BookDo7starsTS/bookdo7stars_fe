'use client';

import React, { useEffect, useState } from 'react';

import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getItemsInCartRequest } from '../actions/types';
import CartCard from '../components/Cart/CartCard';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getItemsInCartRequest());
  }, []);

  // 전체 선택/해제
  const handleToggleSelectAll = () => {
    if (checkedItems.length === items.length) {
      setCheckedItems([]); // 전체 해제
    } else {
      // setCheckedItems(cartItems.map((item) => item.id)); // 전체 선택
    }
  };

  // 개별 체크박스
  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  // 수량 증가
  const handleIncrease = (id: string, quantity: number) => {
    // dispatch(updateCartItemQuantity(id, quantity + 1));
  };

  // 수량 감소
  const handleDecrease = (id: string, quantity: number) => {
    if (quantity > 1) {
      // dispatch(updateCartItemQuantity(id, quantity - 1));
    }
  };

  // 아이템 삭제
  const handleDelete = (id: string) => {
    // dispatch(removeFromCart(id));
    setCheckedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  // 총 금액 및 상품 수 계산
  // const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  // const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  console.log('ITEMS', items);
  return (
    <Box sx={{ mt: '50px' }} p={2} maxWidth="800px" mx="auto">
      {/* Select All / Deselect All Button */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="outlined" onClick={handleToggleSelectAll}>
          {checkedItems.length === items.length ? '전체 해제' : '전체 선택'}
        </Button>
      </Box>

      {/* Cart Items */}
      {items.length > 0 ? (
        items.map((item) => <CartCard key={item.id} book={item.book} quantity={item.quantity} />)
      ) : (
        <Typography variant="h6" textAlign="center">
          장바구니가 비어있습니다.
        </Typography>
      )}

      {/* Summary Section */}
      <Box sx={{ border: '1px solid #ccc', borderRadius: 1, mb: 2, p: 2, backgroundColor: '#f9f9f9' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              총 상품 수량
              {/* : <b>{totalItems}개</b> */}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              총 결제 금액
              {/* : <b>₩{totalPrice.toLocaleString()}</b> */}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Order Button */}
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" disabled={checkedItems.length === 0}>
          선택 상품 주문하기
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
