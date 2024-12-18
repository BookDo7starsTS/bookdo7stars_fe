import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Card, CardContent, Typography, IconButton, Grid, Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const CartCard = ({ book, quantity, onIncrease, onDecrease, onDelete }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Checkbox */}
          <Grid item xs={1}>
            <Checkbox />
          </Grid>

          {/* Product Image */}
          <Grid item xs={3}>
            <Box
              component="img"
              src={book?.cover || 'https://via.placeholder.com/100'}
              alt={book?.title || 'Product Image'}
              sx={{ width: '100%', borderRadius: 1 }}
            />
          </Grid>

          {/* Product Info */}
          <Grid item xs={5}>
            <Typography variant="h6">{book?.title || '제목 없음'}</Typography>
            <Typography color="text.secondary">저자: {book?.author || '알 수 없음'}</Typography>
            <Typography>가격: ₩{book?.price?.toLocaleString() || '0'}</Typography>
          </Grid>

          {/* Quantity and Actions */}
          <Grid item xs={3} textAlign="center">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box display="flex" alignItems="center">
                <IconButton onClick={onDecrease} disabled={quantity <= 1}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{quantity}</Typography>
                <IconButton onClick={onIncrease}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon />} onClick={onDelete}>
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
