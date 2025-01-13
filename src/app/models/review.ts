import { Book } from './book';
import { User } from './user';

export interface ReviewDto {
  bookId: number;
  content: string;
}

export interface Review {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  book: Book;
  user: User;
}
