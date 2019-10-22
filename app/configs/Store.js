import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import bootstrapReducers from '../bootstrap/bootstrapReducers';
import Persist from './Persist';

let finalReducers = bootstrapReducers;
if (Persist.active) {
  const persistConfig = Persist.storeConfig;
  finalReducers = persistReducer(persistConfig, bootstrapReducers);
}

const composeEnhancer =
  __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
export const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  finalReducers,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);
export const persistor = persistStore(store);
