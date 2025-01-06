import { Book } from '@/app/models/book';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { currencyFormat } from '../../../utils/helpers';
import { addToCart } from '@/utils/cartUtils';
import { CartItemDto } from '@/app/models/cart';

interface BookCardProps {
  book: Book;
}

const StyledTypography = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-align: left;
  font-weight: bold;
`;

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((store: RootState) => store.user);
  const { isAddToCartDone } = useSelector((store: RootState) => store.cart);

  const clickBookCard = (book: Book) => {
    router.push(`/book/${book.id}`);
  };

  const handleOnClickAddToCart = (bookId: number) => {
    const cartItem: CartItemDto[] = [{ bookId: bookId, quantity: 1 }];
    const books: Book[] = [book];
    if (user) {
      addToCart(cartItem, books, dispatch, isAddToCartDone, user);
    } else {
      addToCart(cartItem, books, dispatch, isAddToCartDone);
    }
  };

  return (
    <Card
      sx={{
        width: 230,
        height: 370,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.00)',
          boxShadow: 6,
        },
      }}>
      <CardMedia
        component="img"
        image={book.cover}
        alt={book.title}
        sx={{ height: 275, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12, cursor: 'pointer' }}
        onClick={() => clickBookCard(book)}
      />
      <CardContent sx={{ height: 95, width: '100%', padding: '8px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <StyledTypography variant="body2" color="text.secondary">
            {book.title}
          </StyledTypography>
          <StyledTypography variant="body2" color="text.secondary">
            {book.author}
          </StyledTypography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <Typography variant="body2" color="text.primary">
              ₩ {currencyFormat(book.priceStandard)}
            </Typography>
            <Box>
              {/* favorite이 있으면 : 없으면 삼항연산자 넣어서 처리 */}
              <IconButton sx={{ padding: '5px' }} aria-label="add to favorites">
                <FavoriteBorderIcon fontSize="small" sx={{ color: pink[500] }} />
              </IconButton>
              <IconButton sx={{ padding: '5px' }} aria-label="add to cart" onClick={() => handleOnClickAddToCart(book.id)}>
                <ShoppingCartIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default BookCard;
