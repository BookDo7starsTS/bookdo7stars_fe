import { OrderContent } from '@/app/models/order';

import { MAKE_AN_ORDER_FAILURE, MAKE_AN_ORDER_REQUEST, MAKE_AN_ORDER_SUCCESS } from '../constants/order';

export interface MakeAnOrderRequestAction {
  type: typeof MAKE_AN_ORDER_REQUEST;
  data: OrderContent;
}

export interface MakeAnOrderSuccessAction {
  type: typeof MAKE_AN_ORDER_SUCCESS;
  payload: string;
}

export interface MakeAnOrderFailureAction {
  type: typeof MAKE_AN_ORDER_FAILURE;
  error: string;
}

export type OrderActionTypes = MakeAnOrderRequestAction | MakeAnOrderSuccessAction | MakeAnOrderFailureAction;

export const makeAnOrderRequest = (data: MakeAnOrderRequestAction['data']): MakeAnOrderRequestAction => ({
  type: MAKE_AN_ORDER_REQUEST,
  data,
});

export const makeAnOrderSuccess = (payload: MakeAnOrderSuccessAction['payload']): MakeAnOrderSuccessAction => ({
  type: MAKE_AN_ORDER_SUCCESS,
  payload: payload,
});

export const makeAnOrderFailure = (error: string): MakeAnOrderFailureAction => ({
  type: MAKE_AN_ORDER_FAILURE,
  error,
});
