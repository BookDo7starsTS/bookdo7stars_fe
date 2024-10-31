import { useState } from 'react';

import { Book } from '@/app/models/book';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import AddressChange from '../../../utils/AddressChange';
import { currencyFormat } from '../../../utils/helpers';

interface SearchResultBookCardProps {
  book: Book;
}

const StyledCard = styled(Card)`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 12px;
  box-shadow: 3;
  overflow: visible;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  &:hover {
    transform: scale(1.03);
    box-shadow: 6;
  }
`;

const SearchResultBookCard: React.FC<SearchResultBookCardProps> = ({ book }) => {
  const [address, setAddress] = useState('Select your region');
  const theme = useTheme();
  const router = useRouter();
  const clickBookCard = (book: Book) => {
    router.push(`/book/${book.id}`);
  };

  console.log('book: ', book);
  return (
    <StyledCard sx={{ cursor: 'pointer' }} onClick={() => clickBookCard(book)}>
      <CardMedia component="img" image={book.cover} alt={book.title} sx={{ width: 240, height: 380, objectFit: 'cover' }} />
      <CardContent sx={{ paddingTop: '70px', paddingLeft: '30px', height: 380, width: '100%' }}>
        <Typography variant="h6" component="div" onClick={() => clickBookCard(book)} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.author} | {book.publisher} | {new Date(book.pubDate).toLocaleDateString()}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="subtitle2" color="text.primary">
            {currencyFormat(book.priceStandard)}원 →
            <Box component="span" sx={{ color: pink[500], fontWeight: 'bold', fontSize: '20px' }}>
              {currencyFormat(book.priceSales)}원
            </Box>
            (
            <Box component="span" sx={{ color: pink[500] }}>
              10%
            </Box>
            할인), 마일리지{' '}
            <Box component="span" sx={{ color: pink[500] }}>
              {book.mileage}
            </Box>
            원 (
            <Box component="span" sx={{ color: pink[500] }}>
              5%
            </Box>
            적립)
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          세일즈포인트: {currencyFormat(book.salesPoint)}
        </Typography>

        <Box
          component="div"
          display="flex"
          alignItems="center"
          sx={{
            marginTop: '47px',
            fontWeight: 'bold',
            borderRadius: '4px',
            position: 'relative',
          }}
          onClick={(event) => event.stopPropagation()}>
          <div style={{ marginRight: '14px' }}>배송 정보</div>

          <h6 style={{ margin: 0, marginRight: '13px' }}>{address}</h6>
          <Box sx={{ top: '100%', left: 0, zIndex: 100 }}>
            <AddressChange setAddress={setAddress} />
          </Box>
        </Box>
      </CardContent>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '200px',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '8px',
          paddingRight: '60px',
        }}>
        <Button variant="contained" color="primary" sx={{ width: '110px', height: '50px', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <ShoppingCartIcon sx={{ color: 'inherit', marginRight: 0.5 }} />
          장바구니
        </Button>

        <Button sx={{ border: `2px solid ${theme.palette.primary.main}`, width: '110px', height: '50px', marginBottom: '10px' }}>
          <PaymentIcon sx={{ color: 'primary', marginRight: 0.5 }} />
          바로구매
        </Button>

        <Button variant="contained" disabled sx={{ width: '110px', height: '50px' }}>
          <FavoriteBorderIcon sx={{ color: pink[500], marginRight: 0.5 }} />
          보관함
        </Button>
      </Box>
    </StyledCard>
  );
};

export default SearchResultBookCard;
