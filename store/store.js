import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import todosReducer from './slice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: getDefaultMiddleware => [thunk, ...getDefaultMiddleware()],
});

export default store;
