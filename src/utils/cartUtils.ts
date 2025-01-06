import { addToCartRequest, getItemsInCartRequest, setQuantityInLocalstorage } from '@/app/actions/types';
import { Book } from '@/app/models/book';
import { CartItemDto, CartItem } from '@/app/models/cart';
import { User } from '@/app/models/user';
import { AppDispatch } from '@/app/store/store';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const addToCart = (cartItem: CartItemDto[], books: Book[], dispatch: AppDispatch, isAddToCartDone: boolean, user?: User) => {
  if (user) {
    dispatch(addToCartRequest(cartItem));
    if (isAddToCartDone) {
      dispatch(getItemsInCartRequest());
    }
  } else {
    const storedCartItems = localStorage.getItem('cartItems');
    const cartItemsArray: CartItem[] = storedCartItems ? JSON.parse(storedCartItems) : [];

    const matchingAddedItemIndexes = cartItemsArray.map((cartItemArrayEl) => cartItem.findIndex((cartItemEl) => cartItemEl.bookId === cartItemArrayEl.book.id));

    if (matchingAddedItemIndexes.some((index) => index !== -1)) {
      const indexes = matchingAddedItemIndexes.reduce((result: number[], value, index) => {
        if (value !== -1) {
          result.push(index);
        }
        return result;
      }, []);

      indexes.forEach((i) => (cartItemsArray[i].quantity += cartItem[matchingAddedItemIndexes[i]].quantity));
    } else {
      cartItem.map((c) =>
        books.map((book) => {
          return cartItemsArray.push({ id: uuidv4(), book: book, quantity: c.quantity });
        }),
      );
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
    if (cartItem.length === 1) {
      toast.success(`${books[0].title} is added to cart successfully`);
    } else {
      toast.success(`Selected books are added to cart successfully`);
    }
    dispatch(setQuantityInLocalstorage({ totalItems: cartItemsArray.length }));
  }
};
