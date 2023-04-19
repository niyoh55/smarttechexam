import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {CartPayload, CartProduct, CartState} from './types';

const initialState: CartState = {
  cart: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartPayload>) => {
      const cartIndex = state.cart.findIndex(
        item => item.id === action.payload.product.id,
      );
      if (cartIndex !== -1) {
        const updatedItemCart = {
          ...state.cart[cartIndex],
          quantity: state.cart[cartIndex].quantity + action.payload.quantity,
        };
        state.cart[cartIndex] = updatedItemCart;
      } else {
        state.cart.push({
          ...action.payload.product,
          quantity: action.payload.quantity,
        });
      }
    },
    increaseQuantity: (state, action: PayloadAction<CartProduct>) => {
      const cartIndex = state.cart.findIndex(
        item => item.id === action.payload.id,
      );
      const updatedItemCart = {
        ...state.cart[cartIndex],
        quantity: state.cart[cartIndex].quantity + 1,
      };
      state.cart[cartIndex] = updatedItemCart;
    },
    decreaseQuantity: (state, action: PayloadAction<CartProduct>) => {
      const cartIndex = state.cart.findIndex(
        item => item.id === action.payload.id,
      );
      if (state.cart[cartIndex].quantity === 1 && cartIndex !== -1) {
        state.cart.splice(cartIndex, 1);
      } else {
        const updatedItemCart = {
          ...state.cart[cartIndex],
          quantity: state.cart[cartIndex].quantity - 1,
        };
        state.cart[cartIndex] = updatedItemCart;
      }
    },
    removeItemFromCart: (state, action: PayloadAction<CartProduct>) => {
      const cartIndex = state.cart.findIndex(
        item => item.id === action.payload.id,
      );
      if (cartIndex !== -1) {
        state.cart.splice(cartIndex, 1);
      }
    },
    clearCart: state => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  removeItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
