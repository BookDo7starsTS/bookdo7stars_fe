import { RootState } from '@/app/reducers';
import { useSelector } from 'react-redux';

const BookDetailContainer = () => {
  const books = useSelector((store: RootState) => store.book.books);

  console.log(books);

  return (
    <div>
      북디테일 컨테이너
      {/* {books.map((book, index) => (
        <h1 key={index}>book들아 나와라 : {book}</h1>
      ))} */}
    </div>
  );
};

export default BookDetailContainer;
