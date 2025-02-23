import { OrderHistory } from '@/app/models/order';

import { GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, GET_ORDER_HISTORY_FAILURE } from '../constants';

export interface GetOrderHistoryRequestAction {
  type: typeof GET_ORDER_HISTORY_REQUEST;
  page: number;
  pageSize: number;
}

export interface GetOrderHistorySuccessAction {
  type: typeof GET_ORDER_HISTORY_SUCCESS;
  payload: OrderHistory[];
  count: number;
}

export interface GetOrderHistoryFailureAction {
  type: typeof GET_ORDER_HISTORY_FAILURE;
  error: string;
}

export type OrderActionTypes = GetOrderHistoryRequestAction | GetOrderHistorySuccessAction | GetOrderHistoryFailureAction;

// action creater functions
export const getOrderHistoryRequest = (page: number, pageSize: number): GetOrderHistoryRequestAction => ({
  type: GET_ORDER_HISTORY_REQUEST,
  page,
  pageSize,
});

export const getOrderHistorySuccess = (
  payload: GetOrderHistorySuccessAction['payload'],
  count: GetOrderHistorySuccessAction['count'],
): GetOrderHistorySuccessAction => ({
  type: GET_ORDER_HISTORY_SUCCESS,
  payload,
  count,
});

export const getOrderHistoryFailure = (error: string): GetOrderHistoryFailureAction => ({
  type: GET_ORDER_HISTORY_FAILURE,
  error,
});
