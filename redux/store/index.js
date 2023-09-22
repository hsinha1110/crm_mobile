import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import rootReducers from '../slices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import {composeWithDevTools} from '@redux-devtools/extension';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whiteList: ['auth'],
};

export const persistedReducer = persistReducer(
  persistConfig,
  rootReducers,
  composeWithDevTools(applyMiddleware()),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
