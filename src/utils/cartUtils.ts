import { addToCartRequest, getItemsInCartRequest, setQuantityInLocalstorage } from '@/app/actions/types';
import { Book } from '@/app/models/book';
import { CartItemDto, CartItem } from '@/app/models/cart';
import { User } from '@/app/models/user';
import { AppDispatch } from '@/app/store/store';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const handleAddToCart = (bookId: number, book: Book, dispatch: AppDispatch, isAddToCartDone: boolean, user?: User) => {
  const cartItem: CartItemDto = { bookId, quantity: 1 };
  if (user) {
    dispatch(addToCartRequest(cartItem));
    if (isAddToCartDone) {
      dispatch(getItemsInCartRequest());
    }
  } else {
    const storedCartItems = localStorage.getItem('cartItems');
    const cartItemsArray: CartItem[] = storedCartItems ? JSON.parse(storedCartItems) : [];
    const existingCartItemIndex = cartItemsArray.findIndex((item: CartItem) => item.book.id === cartItem.bookId);
    if (existingCartItemIndex !== -1) {
      cartItemsArray[existingCartItemIndex].quantity += cartItem.quantity;
    } else {
      cartItemsArray.push({ id: uuidv4(), book: book, quantity: cartItem.quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
    toast.success(`${book.title} is added to cart successfully`);
    dispatch(setQuantityInLocalstorage({ totalItems: cartItemsArray.length }));
  }
};
