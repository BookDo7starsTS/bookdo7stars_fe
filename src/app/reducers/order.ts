import { GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, GET_ORDER_HISTORY_FAILURE } from '../actions/constants';
import { OrderActionTypes } from '../actions/types';
type InitialState = {
  isGetOrderHistoryRequestLoading: boolean;
  isGetOrderHistoryRequestDone: boolean;
  isGetOrderHistoryRequestError: string;
  orderHistory: Array<any>;
  count: number;
};

export const initialState: InitialState = {
  isGetOrderHistoryRequestLoading: false,
  isGetOrderHistoryRequestDone: false,
  isGetOrderHistoryRequestError: '',
  orderHistory: [],
  count: 0,
};

function orderReducer(state = initialState, action: OrderActionTypes) {
  switch (action.type) {
    case GET_ORDER_HISTORY_REQUEST:
      return { ...state, isGetOrderHistoryRequestLoading: true };
    case GET_ORDER_HISTORY_SUCCESS:
      console.log('payload', action);
      return { ...state, isGetOrderHistoryRequestLoading: false, isGetOrderHistoryRequestDone: true, orderHistory: action.payload, count: action.count };
    case GET_ORDER_HISTORY_FAILURE:
      return { ...state, isGetOrderHistoryRequestError: action.error };
    default:
      return state;
  }
}

export default orderReducer;
