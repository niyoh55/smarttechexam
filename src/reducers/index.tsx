import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './cart/cartSlice';
import productsSlice from './products/productsSlice';

export const store = configureStore({
  reducer: {products: productsSlice, cart: cartSlice},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
