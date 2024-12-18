import { Book } from '@/app/models/book';
import { CartItem } from '@/app/models/cart';

import { ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY, CLEAR_CART } from '../constants';

export interface AddToCartRequestAction {
  type: typeof ADD_TO_CART_REQUEST;
  data: CartItem;
}

export interface AddToCartSuccessAction {
  type: typeof ADD_TO_CART_SUCCESS;
  payload: CartItem;
}

export interface AddToCartFailureAction {
  type: typeof ADD_TO_CART_FAILURE;
  error: string;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: string; // Book ID
}

export interface UpdateCartItemQuantityAction {
  type: typeof UPDATE_CART_ITEM_QUANTITY;
  payload: {
    bookId: string;
    quantity: number;
  };
}

export interface ClearCartAction {
  type: typeof CLEAR_CART;
}

export type CartActionTypes =
  | AddToCartRequestAction
  | AddToCartSuccessAction
  | AddToCartFailureAction
  | RemoveFromCartAction
  | UpdateCartItemQuantityAction
  | ClearCartAction;

export const addToCartRequest = (cartItem: CartItem): AddToCartRequestAction => ({
  type: ADD_TO_CART_REQUEST,
  data: cartItem,
});

export const addToCartSuccess = (cartItem: CartItem): AddToCartSuccessAction => ({
  type: ADD_TO_CART_SUCCESS,
  payload: cartItem,
});

export const addToCartFailure = (error: string): AddToCartFailureAction => ({
  type: ADD_TO_CART_FAILURE,
  error,
});

export const removeFromCart = (bookId: string): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  payload: bookId,
});

export const updateCartItemQuantity = (bookId: string, quantity: number): UpdateCartItemQuantityAction => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { bookId, quantity },
});

export const clearCart = (): ClearCartAction => ({
  type: CLEAR_CART,
});
