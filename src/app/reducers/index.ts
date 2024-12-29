import { combineReducers } from 'redux';

import { bookReducer, mainpageBookReducer } from './book';
import categoryReducer from './category';
import userReducer from './user';
import wishlistReducer from './wishlist';

const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
  mainpageBook: mainpageBookReducer,
  category: categoryReducer,
  wishlist: wishlistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
