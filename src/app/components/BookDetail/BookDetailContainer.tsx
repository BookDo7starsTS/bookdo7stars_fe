import { Box, Container, Grid } from '@mui/material';

import BookBasicInfo from './BookDetailComponents/BookBasicInfo';
import BookCover from './BookDetailComponents/BookCover';
import BookToCartButton from './BookDetailComponents/BookToCartButton';
import { Book } from '../../models/book';

// 타입을 명시적으로 지정 (예시)
interface BookDetailContaineProps {
  book: Book | null;
}

const BookDetailContainer: React.FC<BookDetailContaineProps> = ({ book }) => {
  if (!book) {
    return <p>책 정보를 읽어오지 못했습니다.</p>;
  }
  return (
    <Box sx={{ mt: { xs: 8, md: 16 } }}>
      <Container sx={{ mb: 4 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <BookCover cover={book.cover} />
          </Grid>
          <Grid item xs={12} md={8}>
            {book ? (
              <BookBasicInfo title={book.title} author={book.author} publisher={book.publisher} priceStandard={book.priceStandard} />
            ) : (
              <p>책 정보를 읽어오지 못했습니다.</p>
            )}
            <BookToCartButton book={book} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookDetailContainer;
