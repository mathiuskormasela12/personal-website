// =========== Store
// import all modules
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import rootReducer from './reducers';

const persistedStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    // RTK's default middleware already includes thunk. redux-persist's actions carry functions, so skip them in the serializable check.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};

export default persistedStore();
