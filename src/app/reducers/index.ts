import { combineReducers } from 'redux';

import { bookReducer, mainpageBookReducer } from './book';
import cartReducer from './cart';
import categoryReducer from './category';
import userReducer from './user';
import reviewReducer from './review';

const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
  mainpageBook: mainpageBookReducer,
  category: categoryReducer,
  cart: cartReducer,
  review: reviewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
