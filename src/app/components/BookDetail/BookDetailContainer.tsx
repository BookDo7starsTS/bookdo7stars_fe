import { RootState } from '@/app/reducers';
import { useSelector } from 'react-redux';

// 타입을 명시적으로 지정 (예시)
interface Book {
  title: string;
  author: string;
  priceStandard: number;
}

const BookDetailContainer = () => {
  const book: Book | null = useSelector((store: RootState) => store.book.book);

  console.log('북:', book);

  return (
    <div>
      북디테일 컨테이너
      {book ? (
        <div>
          <h3>{book.title}</h3>
          <p> 저자: {book.author}</p>
          <p> 가격: {book.priceStandard}</p>
        </div>
      ) : (
        <p>책 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default BookDetailContainer;
