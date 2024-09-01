import { RootState } from '@/app/reducers';
import { Box, Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

// 타입을 명시적으로 지정 (예시)
interface Book {
  title: string;
  author: string;
  priceStandard: number;
  cover: string;
}

const BookDetailContainer = () => {
  const book: Book | null = useSelector((store: RootState) => store.book.book);

  console.log('북:', book);

  return (
    <Box>
      북디테일 컨테이너
      <Container sx={{ mb: 4 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            {book ? <img src={book.cover} alt="Book Cover" style={{ maxWidth: '100%', height: 'auto' }} /> : <p>북 커버 없음</p>}
          </Grid>
          <Grid item xs={12} md={8}>
            {book ? (
              <div>
                <h3>{book.title}</h3>
                <p> 저자: {book.author}</p>
                <p> 가격: {book.priceStandard}</p>
              </div>
            ) : (
              <p>책 정보를 불러오는 중입니다...</p>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookDetailContainer;
