import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {
  CartOnlyPayload,
  CartPayload,
  CartProduct,
  CartState,
  Product,
} from './types';
import {getData, storeData} from '../../utils';
import {RootState} from '..';

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const response = await getData('CART');

  return response;
});

export const addToCart = createAsyncThunk<any, any, {state: RootState}>(
  'cart/addToCart',
  async ({product, quantity}, thunkAPI) => {
    const state = thunkAPI.getState().cart;
    const cartIndex = state.cart.findIndex(
      (item: Product) => item.id === product.id,
    );
    let updatedCart = [...state.cart];
    if (cartIndex !== -1) {
      const updatedItemCart = {
        ...state.cart[cartIndex],
        quantity: state.cart[cartIndex].quantity + quantity,
      };
      updatedCart[cartIndex] = updatedItemCart;
    } else {
      updatedCart.unshift({
        ...product,
        quantity: quantity,
      });
    }

    await storeData('CART', updatedCart);

    return updatedCart;
  },
);

export const increaseQuantity = createAsyncThunk<any, any, {state: RootState}>(
  'cart/increaseQuantity',
  async ({product}: CartOnlyPayload, thunkAPI) => {
    const state = thunkAPI.getState().cart;
    const cartIndex = state.cart.findIndex(
      (item: Product) => item.id === product.id,
    );
    let updatedCart = [...state.cart];

    const updatedItemCart = {
      ...state.cart[cartIndex],
      quantity: state.cart[cartIndex].quantity + 1,
    };
    updatedCart[cartIndex] = updatedItemCart;

    await storeData('CART', updatedCart);

    return updatedCart;
  },
);

export const decreaseQuantity = createAsyncThunk<any, any, {state: RootState}>(
  'cart/decreaseQuantity',
  async ({product}: CartOnlyPayload, thunkAPI) => {
    const state = thunkAPI.getState().cart;
    let updatedCart = [...state.cart];
    const cartIndex = state.cart.findIndex(
      (item: Product) => item.id === product.id,
    );
    if (state.cart[cartIndex].quantity === 1 && cartIndex !== -1) {
      updatedCart.splice(cartIndex, 1);
    } else {
      const updatedItemCart = {
        ...state.cart[cartIndex],
        quantity: state.cart[cartIndex].quantity - 1,
      };
      updatedCart[cartIndex] = updatedItemCart;
    }

    await storeData('CART', updatedCart);

    return updatedCart;
  },
);

export const removeItemFromCart = createAsyncThunk<
  any,
  any,
  {state: RootState}
>('cart/removeItemFromCart', async ({product}: CartOnlyPayload, thunkAPI) => {
  const state = thunkAPI.getState().cart;
  let updatedCart = [...state.cart];
  const cartIndex = state.cart.findIndex(
    (item: Product) => item.id === product.id,
  );
  if (cartIndex !== -1) {
    updatedCart.splice(cartIndex, 1);
  }

  await storeData('CART', updatedCart);

  return updatedCart;
});
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (userId: number, thunkAPI) => {
    await storeData('CART', []);
    return [];
  },
);

const initialState: CartState = {
  cart: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartPayload>) => {},
    increaseQuantity: (state, action: PayloadAction<CartProduct>) => {},
    decreaseQuantity: (state, action: PayloadAction<CartProduct>) => {},
    removeItemFromCart: (state, action: PayloadAction<CartProduct>) => {},
    clearCart: state => {},
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.cart = [...action.payload];
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
