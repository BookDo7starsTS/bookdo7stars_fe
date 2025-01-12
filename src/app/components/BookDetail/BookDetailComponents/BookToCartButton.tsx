import React from 'react';
import { useState } from 'react';

import { toggleWishlistRequest } from '@/app/actions/types';
import { AppDispatch } from '@/app/store/store';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Box } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

// Props 타입 정의

interface Book {
  id: number;
  title: string;
  author: string;
  priceStandard: number;
  cover: string;
  publisher: string;
  isBookmarked: boolean;
}

interface BookToCartButtonProps {
  book: Book;
  quantity: number;
}

const BookToCartButton: React.FC<BookToCartButtonProps> = ({ book, quantity }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(book.isBookmarked);
  const handleAddToCart = () => {
    // 카트에 추가하는 로직 구현
    const cartItem = { ...book, quantity };
    console.log('북디테일페이지에서 카트에 추가하기 버튼으로 카트에 추가:', cartItem);

    //상태저장하기

    router.push(`/cart`);
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
