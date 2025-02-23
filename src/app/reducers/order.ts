import { MAKE_AN_ORDER_REQUEST, MAKE_AN_ORDER_SUCCESS, MAKE_AN_ORDER_FAILURE } from '../actions/constants';
import { OrderActionTypes } from '../actions/types';

interface OrderState {
  orderNumber: string;
  isMakeAnOrderLoading: boolean;
  isMakeAnOrderDone: boolean;
  isMakeAnOrderError: string;
}
const initialOrderState: OrderState = {
  orderNumber: '',
  isMakeAnOrderLoading: false,
  isMakeAnOrderDone: false,
  isMakeAnOrderError: '',
};
function orderReducer(state = initialOrderState, action: OrderActionTypes): OrderState {
  switch (action.type) {
    case MAKE_AN_ORDER_REQUEST:
      return { ...state, isMakeAnOrderLoading: true };

    case MAKE_AN_ORDER_SUCCESS: {
      console.log(action.payload);
      return { ...state, isMakeAnOrderLoading: false, isMakeAnOrderDone: true, orderNumber: action.payload };
    }

    case MAKE_AN_ORDER_FAILURE:
      return { ...state, isMakeAnOrderLoading: false, isMakeAnOrderError: action.error };

    default:
      return state;
  }
}

export default orderReducer;
