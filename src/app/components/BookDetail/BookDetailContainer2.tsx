import { useState, useEffect } from 'react';

import { Box, Container, Tabs, Tab, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

import BookDetailBookInfo from './BookDetailBookInfo';
import BookDetailOtherByAuthor from './BookDetailOtherByAuthor';
import BookDetailReview from './BookDetailReview';
import BookDetailShippingPolicy from './BookDetailShippingPolicy';
import { Book } from '../../models/book';

interface BookDetailContainer2Props {
  book: Book | null;
}

const BookDetailContainer2: React.FC<BookDetailContainer2Props> = ({ book }) => {
  const [activeTab, setActiveTab] = useState<string>('bookIntro');
  const router = useRouter();

  const handleTabChange = () => {};
  if (!book) {
    return <p>책 정보를 읽어오지 못했습니다.</p>;
  }

  return (
    <Box sx={{ mt: { xs: 8, md: 16 } }}>
      <Container sx={{ mt: 5, mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{ backgroundColor: '#DADFCE', opacity: '90%', position: 'sticky', top: '0', ml: '0', width: '100%', zIndex: 1000 }}>
          <Tab label="Book Introduction" value="bookIntro" />
          <Tab label="Book Information" value="bookInfo" />
          <Tab label="Other Books by the Author" value="author" />
          <Tab label="Reviews" value="reviews" />
          <Tab label="Delivery" value="delivery" />
        </Tabs>
        <Box id="bookIntro">
          <Typography variant="h4" my={4}>
            Book Introduction
          </Typography>
          <Box component={Paper} sx={{ mt: 2, mb: 2, outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '100%' }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" dangerouslySetInnerHTML={{ __html: book.description || 'No description available' }} />
            </Box>
          </Box>
        </Box>
        <Box id="bookInfo" my={4}>
          <Typography variant="h4">Book Information</Typography>
          <BookDetailBookInfo book={book} />
        </Box>
        <Box id="author" my={4}>
          <Typography variant="h4">Other Books by the Author</Typography>
          <BookDetailOtherByAuthor />
        </Box>
        <Box id="reviews" my={4}>
          <Typography variant="h4">Reviews</Typography>
          <BookDetailReview />
        </Box>
        <Box id="delivery" my={4}>
          <Typography variant="h4">Shipping/Returns/Exchanges Policy</Typography>
          <BookDetailShippingPolicy />
        </Box>
      </Container>
    </Box>
  );
};
export default BookDetailContainer2;
