// ========== Root Reducer
// import all modules
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import storage from '../storage';

// import all reducers
import authReducer from './auth';
import projectsReducer from './projects';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['authTemporary'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  projects: projectsReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
