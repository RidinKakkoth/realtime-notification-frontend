import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';

const persistConfig = {
  key: 'root',
  storage, // uses localStorage by default
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,  // Persisted user state
    products: productReducer,    // Non-persisted products state
  },
});
const persistor = persistStore(store);

export { store, persistor };
