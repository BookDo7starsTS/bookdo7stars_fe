import { Book } from './book';
import { User } from './user';

export interface CartItem {
  id?: number;
  quantity: number;
  book: Book;
}
