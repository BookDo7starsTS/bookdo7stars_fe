'use client';
import { useEffect, useRef, useState } from 'react';

import { getAllReviewsOfBookRequest } from '@/app/actions/types';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box, Container, Tabs, Tab, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import BookDetailBookInfo from './BookDetailComponents/BookDetailBookInfo';
import BookDetailOtherByAuthor from './BookDetailComponents/BookDetailOtherByAuthor';
import BookDetailShippingPolicy from './BookDetailComponents/BookDetailShippingPolicy';
import ReviewCard from './BookDetailComponents/Review/ReviewCard';
import { Book } from '../../models/book';

interface BookDetailsProps {
  book: Book;
  user: any;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, user }) => {
  const [activeTab, setActiveTab] = useState<string>('bookIntro');
  const dispatch = useDispatch<AppDispatch>();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const lastScrollY = useRef<number>(0);

  const { reviews } = useSelector((store: RootState) => store.review);

  const sections = [
    { id: 'bookIntro', label: 'Book Introduction' },
    { id: 'bookInfo', label: 'Book Information' },
    { id: 'author', label: 'Other Books by the Author' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'delivery', label: 'Delivery' },
  ];

  useEffect(() => {
    dispatch(getAllReviewsOfBookRequest({ bookId: book.id }));
  }, [book.id]);

  useEffect(() => {
    if (!Object.values(sectionRefs.current).every((el) => el)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY.current;
        lastScrollY.current = currentScrollY;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50% 0px -50% 0px', // 🔥 섹션 간 거리가 작아도 잘 감지되도록 설정
      },
    );

    Object.values(sectionRefs.current).forEach((sectionElement) => {
      if (sectionElement) observer.observe(sectionElement);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let closestSection = null;
      let minDistance = Infinity;

      Object.entries(sectionRefs.current).forEach(([id, section]) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100); // 🔥 기준 위치에서 가장 가까운 섹션 감지
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = id;
          }
        }
      });

      if (closestSection) {
        setActiveTab(closestSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);

    setTimeout(() => {
      const sectionElement = sectionRefs.current[newValue];
      if (sectionElement) {
        const yOffset = -50;
        const y = sectionElement.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 20);
  };

  if (!book) return <p>책 정보를 불러오지 못했습니다.</p>;

  return (
    <Box data-testid="book-detail-box" sx={{ mt: { xs: 8, md: 16 } }}>
      <Container sx={{ mt: 5, mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{ backgroundColor: '#DADFCE', opacity: '90%', position: 'sticky', top: '0', width: '100%', zIndex: 1000 }}>
          {sections.map((section) => (
            <Tab key={section.id} label={section.label} value={section.id} />
          ))}
        </Tabs>
        {sections.map((section) => (
          <Box key={section.id} id={section.id} ref={(el) => (sectionRefs.current[section.id] = el)} my={80}>
            <Typography variant="h4">{section.label}</Typography>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default BookDetails;
