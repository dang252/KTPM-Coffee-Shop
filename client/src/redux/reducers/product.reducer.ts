import { createReducer } from "@reduxjs/toolkit";

import { Product, CartProduct } from "../../types/product";

import {
  addProductToCart,
  removeProductToCart,
  increaseProductToCart,
  decreaseProductToCart,
} from "../actions/product.action";

// Interface declair
interface UserState {
  sourceList: Product[];
  categoryList: Product[];
  cart: CartProduct[];
}

// InitialState value
const initialState: UserState = {
  sourceList: [],
  categoryList: [],
  cart: [],
};

// createAsyncThunk middleware

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addProductToCart, (state, action) => {
      const product: any = action.payload;
      state.cart.push(product);
    })
    .addCase(removeProductToCart, (state, action) => {
      const cart_id: string = action.payload;
      state.cart = state.cart.filter(
        (cart) => cart.cart_id.toString() !== cart_id
      );
    })
    .addCase(increaseProductToCart, (state, action) => {
      const { cart_id, value }: any = action.payload;

      for (let i = 0; i < state.cart.length; ++i) {
        if (state.cart[i].cart_id.toString() === cart_id)
          state.cart[i].quantity = value;
      }
    })
    .addCase(decreaseProductToCart, (state, action) => {
      const { cart_id, value }: any = action.payload;

      for (let i = 0; i < state.cart.length; ++i) {
        if (state.cart[i].cart_id.toString() === cart_id)
          state.cart[i].quantity = value;
      }
    });
});

export default productReducer;
