import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import session from './session';
import wines from './wine';
import wineries from './winery';
import reviews from './review';
import wineTypes from './wineType';
import colorTypes from './colorType';
import users from './user';
import favorites from './favorite';

const rootReducer = combineReducers({
  session,
  wines,
  wineries,
  reviews,
  wineTypes,
  colorTypes,
  users,
  favorites,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;