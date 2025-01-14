'use client';
import { useEffect, useState } from 'react';

import { Box, Container, Tabs, Tab, Typography, Paper } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

import BookDetailBookInfo from './BookDetailComponents/BookDetailBookInfo';
import BookDetailOtherByAuthor from './BookDetailComponents/BookDetailOtherByAuthor';
import BookDetailReview from './BookDetailComponents/BookDetailReview';
import BookDetailShippingPolicy from './BookDetailComponents/BookDetailShippingPolicy';
import { Book } from '../../models/book';
import Review from './BookDetailComponents/Review/Review';
import { AppDispatch } from '@/app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addReviewRequest, getAllReviewsOfBookRequest } from '@/app/actions/types';
import { RootState } from '@/app/reducers';
import { toast } from 'react-toastify';
import ReviewCard from './BookDetailComponents/Review/ReviewCard';

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const [activeTab, setActiveTab] = useState<string>('bookIntro');
  const [review, setReview] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAddReviewError, isAddReviewDone, reviews } = useSelector((store: RootState) => store.review);

  const section = searchParams.get('section') || 'bookIntro';

  useEffect(() => {
    dispatch(getAllReviewsOfBookRequest({ bookId: book.id }));
  }, [isAddReviewDone]);
  console.log(reviews);

  useEffect(() => {
    if (section && section !== activeTab) {
      setActiveTab(section as string);
    }
  }, [section, activeTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);

    const params = new URLSearchParams(window.location.search);
    params.set('section', newValue);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if (isAddReviewError) {
      toast.error(isAddReviewError);
    }
  }, [isAddReviewError]);

  useEffect(() => {
    if (isAddReviewDone) {
      toast.success('Your review is posted Successfully!');
    }
  }, [isAddReviewDone]);

  const handleOnChangeReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.value', event.target.value);
    setReview(event.target.value);
  };

  const postReview = () => {
    console.log('hahaha', review);
    dispatch(addReviewRequest({ bookId: book.id, content: review }));

    setReview('');
  };

  if (!book) {
    return <p>책 정보를 읽어오지 못했습니다.</p>;
  }

  return (
    <Box data-testid="book-detail-box" sx={{ mt: { xs: 8, md: 16 } }}>
      <Container sx={{ mt: 5, mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          // centered
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{
            backgroundColor: '#DADFCE',
            opacity: '90%',
            position: 'sticky',
            top: '0',
            ml: '0',
            width: '100%',
            zIndex: 1000,
          }}>
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
          <Box
            component={Paper}
            sx={{
              mt: 2,
              mb: 2,
              outline: '1px solid #DFE4DF',
              backgroundColor: '#DADFDA',
              width: '100%',
            }}>
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
          <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
            Reviews
          </Typography>
          {reviews.length > 0 && reviews.map((review) => <ReviewCard review={review} />)}
          <Review handleOnClick={postReview} handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangeReview(event)} review={review} />
          {/* <BookDetailReview /> */}
        </Box>
        <Box id="delivery" my={4}>
          <Typography variant="h4">Shipping/Returns/Exchanges Policy</Typography>
          <BookDetailShippingPolicy />
        </Box>
      </Container>
    </Box>
  );
};
export default BookDetails;
