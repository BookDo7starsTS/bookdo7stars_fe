import React from 'react';
import { useState } from 'react';

import { toggleWishlistRequest } from '@/app/actions/types';
import { AppDispatch } from '@/app/store/store';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Box } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Book } from '@/app/models/book';
import { CartItemDto } from '@/app/models/cart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/reducers';
import { addToCart } from '@/utils/cartUtils';

// Props 타입 정의

interface Book {
  title: string;
  author: string;
  priceStandard: number;
  cover: string;
  publisher: string;
}

interface BookToCartButtonProps {
  book: Book;
  quantity: number;
}

const BookToCartButton: React.FC<BookToCartButtonProps> = ({ book, quantity }) => {
  const router = useRouter();
  const handleAddToCart = () => {
    const cartItem: CartItemDto[] = [{ bookId: book.id, quantity: quantity }];
    const books: Book[] = [book];
    if (user) {
      addToCart(cartItem, books, dispatch, isAddToCartDone, user);
    } else {
      addToCart(cartItem, books, dispatch, isAddToCartDone);
    }
  };

  const handleWishlistClick = () => {
    // 찜하기 기능 구현
    dispatch(toggleWishlistRequest(book.id));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button onClick={handleAddToCart} variant="contained" color="primary" startIcon={<AddShoppingCartIcon />} sx={{ height: '60px', flexGrow: 1 }}>
        카트에 추가하기
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={isBookmarked ? <FavoriteIcon sx={{ color: pink[500] }} /> : <FavoriteBorderIcon sx={{ color: pink[500] }} />}
        sx={{ height: '60px', flexGrow: 1 }}
        onClick={handleWishlistClick}>
        찜하기
      </Button>
    </Box>
  );
};

export default BookToCartButton;
