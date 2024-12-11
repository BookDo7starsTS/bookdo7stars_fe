import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Card, CardContent, Typography, Button, IconButton, Grid, Checkbox } from '@mui/material';

const CartCard = ({ quantity, checked, onIncrease, onDecrease, onDelete, onCheckboxChange }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Checkbox */}
          <Grid item xs={1}>
            <Checkbox checked={checked} onChange={onCheckboxChange} inputProps={{ 'aria-label': 'Select item' }} />
          </Grid>

          {/* Product Image */}
          <Grid item xs={3}>
            <Box
              component="img"
              src="https://via.placeholder.com/100" // Replace with your image URL
              alt="Product Image"
              sx={{ width: '100%', borderRadius: 1 }}
            />
          </Grid>

          {/* Product Info */}
          <Grid item xs={5}>
            <Typography variant="h6">[국내도서] 소년이 온다 - 2024 노벨문학상 수상작가</Typography>
            <Typography color="text.secondary">정가: 15,000원</Typography>
            <Typography>
              판매가: <b>13,500원</b> (1,500원 할인)
            </Typography>
            <Typography>마일리지: 750원 (5%)</Typography>
            <Typography color="primary">내일 수령 가능</Typography>
          </Grid>

          {/* Quantity and Actions */}
          <Grid item xs={3} textAlign="center">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box display="flex" alignItems="center" justifyContent="center">
                <IconButton onClick={onDecrease} disabled={quantity <= 1}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ mx: 1 }}>
                  {quantity}
                </Typography>
                <IconButton onClick={onIncrease}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon />} sx={{ mt: 1 }} onClick={onDelete}>
                삭제
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartCard;
