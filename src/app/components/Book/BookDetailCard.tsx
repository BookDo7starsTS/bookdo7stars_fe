import { useState } from 'react';

import { Book } from '@/app/models/book';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import AddressChange from '../../../utils/AddressChange';
import { currencyFormat } from '../../../utils/helpers';
import { inherits } from 'util';
import { flexbox } from '@mui/system';

interface BookDetailCardProps {
  book: Book;
}

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  border-radius: 12px;
  box-shadow: 3;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  &:hover {
    transform: scale(1.009);
    box-shadow: 6;
  }
  /* 모바일에서만 max-width 적용 */
  @media (max-width: 900px) {
    max-width: 440px;
  }
`;

const BookDetailCard: React.FC<BookDetailCardProps> = ({ book }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [address, setAddress] = useState('Select your region');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const clickBookCard = (book: Book) => {
    setLoading(true);
    router.push(`/book/${book.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('장바구니에 추가');
  };

  const handleAddToBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('바로구매');
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('보관함에 추가');
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card
          sx={{
            cursor: 'pointer',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'stretch',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: 3,
            display: 'flex',
            width: '100%',
            height: 300,
            padding: 0,
          }}
          onClick={() => clickBookCard(book)}>
          <CardMedia
            component="img"
            image={book.cover}
            alt={book.title}
            sx={{
              width: { xs: '100%', md: '240px' },
              height: '100%',
              objectFit: 'cover',
              borderTopLeftRadius: '12px',
              borderBottomLeftRadius: '12px',

              // borderTopLeftRadius: { md: '12px' },
              // borderBottomLeftRadius: { md: '12px' },
              // paddingTop: { xs: '30px', md: '0px' },
              // width: 240,
              // height: 380,
              // objectFit: 'cover',
            }}
          />
          <CardContent
            sx={{
              width: '70%',
              height: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              padding: { xs: '16px', md: '24px' }, // 화면 크기에 따라 패딩 조정
              justifyContent: 'space-between',
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%', height: '100%', justifyContent: 'space-between' }} className="card-content-info">
              <Typography
                variant="h6"
                onClick={() => clickBookCard(book)}
                sx={{ cursor: 'pointer', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                {book.title.split('-')[0].trim()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                {book.author} | {book.publisher} | {new Date(book.pubDate).toLocaleDateString()}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    {currencyFormat(book.priceStandard)}원 →
                  </Typography>
                  <Typography sx={{ color: pink[500], fontWeight: 'bold', fontSize: '20px' }}>{currencyFormat(book.priceSales)}원</Typography>
                  <Typography sx={{ marginLeft: '0.8rem', color: pink[500], fontSize: '16px' }}>
                    ({(((book.priceStandard - book.priceSales) / book.priceStandard) * 100).toFixed(2)}% 할인
                  </Typography>
                  <Typography sx={{ color: pink[500], fontSize: '16px' }}>{book.mileage}p 적립)</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}></Box>

              <Typography variant="caption" color="text.secondary">
                세일즈포인트: {currencyFormat(book.salesPoint)}
              </Typography>
              <Box
                className="region-select-box"
                component="div"
                display={{ xs: 'none', md: 'flex' }}
                alignItems="center"
                sx={{
                  backgroundColor: `${theme.palette.third.main}`,
                  width: '100%',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  position: 'relative',
                  flexWrap: 'wrap',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  flexDirection: 'row',
                  gap: '0.25rem',
                  zIndex: 1000,
                  padding: '0.5rem 0.25rem 0.5rem 0.25rem',
                }}
                onClick={(event) => event.stopPropagation()}>
                <Box sx={{ display: 'flex', gap: 5 }}>
                  <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>배송 정보</Typography>
                  <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>{address}</Typography>
                </Box>

                <Box sx={{ zIndex: 1000 }}>
                  <AddressChange setAddress={setAddress} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: { xs: 'row', md: 'column' },
                width: '30%',
                height: '100%',
              }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: '110px', height: '50px', display: 'flex', alignItems: 'center' }}
                onClick={handleAddToCart}>
                <ShoppingCartIcon sx={{ color: 'inherit', marginRight: 0.5 }} />
                장바구니
              </Button>

              <Button sx={{ border: `2px solid ${theme.palette.primary.main}`, width: '110px', height: '50px' }} onClick={handleAddToBuy}>
                <PaymentIcon sx={{ color: 'primary', marginRight: 0.5 }} />
                바로구매
              </Button>

              <Box onClick={(e) => e.stopPropagation()} style={{ cursor: 'default' }}>
                <Button
                  variant="contained"
                  disabled
                  sx={{
                    width: '110px',
                    height: '50px',
                  }}>
                  <FavoriteBorderIcon sx={{ color: pink[500], marginRight: 0.5 }} />
                  보관함
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BookDetailCard;
