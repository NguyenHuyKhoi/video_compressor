import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import appReducer from '../reducer/appReducer';
import languageReducer from '../reducer/languageReducer';
const sagaMiddleware = createSagaMiddleware();
const middleware = [];
middleware.push(createLogger());
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['language'],
  blacklist: ['auth'],
};
const rootReducer = combineReducers({
  language: languageReducer,
  appReducer: appReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  // middleware: [sagaMiddleware, ...middleware],
  middleware: [sagaMiddleware],
});
const persistor = persistStore(store);
export {persistor, store};
export type RootState = ReturnType<typeof rootReducer>;
