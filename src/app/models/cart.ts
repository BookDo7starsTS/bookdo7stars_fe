import { User } from './user';

export interface CartItem {
  id?: number;
  bookId: number;
  quantity: number;
  user: User | null;
}
