import LoadingButton from '@mui/lab/LoadingButton';
import { Container, Grid, Box } from '@mui/material';

import { Book } from '../../../models/book';
import BookCard from '../../Book/BookCard';

interface BookDetailOtherByAuthorProps {
  books: Book[];
  hasMore: boolean;
  isLoading: boolean;
  onSeeMore: () => void;
}

const BookDetailOtherByAuthor: React.FC<BookDetailOtherByAuthorProps> = ({ books, hasMore, isLoading, onSeeMore }) => {
  return (
    <Container>
      <Box id="author" my={4}>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {books.map((book, index) => (
            <Grid
              data-testid="book-card"
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              sx={{ paddingY: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <BookCard key={index} book={book} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            onClick={onSeeMore}
            variant="contained"
            sx={{ '& .MuiLoadingButton-startIcon': { marginRight: '8px' } }}>
            See more
          </LoadingButton>
        </Box>
      )}
    </Container>
  );
};
export default BookDetailOtherByAuthor;
