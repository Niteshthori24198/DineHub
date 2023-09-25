
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';

import thunk from 'redux-thunk';

import { reducer as restaurantReducer } from './Restaurant/reducer';
import { reducer as userReducer } from './User/reducer';

const rootReducer = combineReducers({
    restaurant: restaurantReducer,
    user: userReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
