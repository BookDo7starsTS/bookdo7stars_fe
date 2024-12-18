import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CLEAR_CART,
} from '../actions/constants';
import { CartActionTypes } from '../actions/types';
import { CartItem } from '../models/cart';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isAddToCartLoading: boolean;
  isAddToCartDone: boolean;
  isAddToCartError: string;
}
const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isAddToCartLoading: false,
  isAddToCartDone: false,
  isAddToCartError: '',
};
function cartReducer(state = initialCartState, action: CartActionTypes): CartState {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { ...state, isAddToCartLoading: true };

    case ADD_TO_CART_SUCCESS: {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item));
      } else {
        updatedItems = [...state.items, newItem];
      }

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
        isAddToCartLoading: false,
        isAddToCartDone: true,
      };
    }

    case ADD_TO_CART_FAILURE:
      return { ...state, isAddToCartLoading: false, isAddToCartError: action.error };

    case REMOVE_FROM_CART: {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return { ...state, items: updatedItems, totalItems, totalPrice };
    }

    case UPDATE_CART_ITEM_QUANTITY: {
      const { bookId, quantity } = action.payload;

      const updatedItems = state.items.map((item) => (item.id === bookId ? { ...item, quantity } : item));

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return { ...state, items: updatedItems, totalItems, totalPrice };
    }

    case CLEAR_CART:
      return { ...initialCartState };

    case ADD_TO_CART: {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.title === newItem.title);

      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map((item) => (item.title === newItem.title ? { ...item, quantity: item.quantity + newItem.quantity } : item));
      } else {
        updatedItems = [...state.items, newItem];
      }

      return { ...state, items: updatedItems };
    }
    default:
      return state;
  }
}

export default cartReducer;
