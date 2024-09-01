// import { mockBooks } from '@/app/models/book';
import { Book } from '@/app/models/book';
import { Grid } from '@mui/material';

import BookCard from './BookCard';

type BooksContainerProps = {
  books: Book[];
};
const BooksContainer: React.FC<BooksContainerProps> = ({ books }) => {
  if (!books) {
    return;
  }

  return (
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
          sx={{ paddingY: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BookCard key={index} book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BooksContainer;
