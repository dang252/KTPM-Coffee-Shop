import { createReducer } from "@reduxjs/toolkit";

import { Product, CartProduct } from "../../types/product";

import {
  PendingAction,
  FulfilledAction,
  RejectedAction,
} from "../../types/reduxThunk.type";

import {
  addProductToCart,
  removeProductToCart,
  increaseProductToCart,
  decreaseProductToCart,
  updateCart,
} from "../actions/product.action";

// Interface declair
interface UserState {
  currentId: string;
  sourceList: Product[];
  categoryList: Product[];
  cart: CartProduct[];
  isLoading: boolean;
  isError: boolean;
}

// InitialState value
const initialState: UserState = {
  currentId: "",
  sourceList: [],
  categoryList: [],
  cart: [],
  isLoading: false,
  isError: false,
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
      const { cart_id, quantity, price }: any = action.payload;

      for (let i = 0; i < state.cart.length; ++i) {
        if (state.cart[i].cart_id.toString() === cart_id)
          state.cart[i].quantity = quantity;
        state.cart[i].price = price;
      }
    })
    .addCase(decreaseProductToCart, (state, action) => {
      const { cart_id, quantity, price }: any = action.payload;

      for (let i = 0; i < state.cart.length; ++i) {
        if (state.cart[i].cart_id.toString() === cart_id)
          state.cart[i].quantity = quantity;
        state.cart[i].price = price;
      }
    })
    .addCase(updateCart, (state, action) => {
      const newCart: any = action.payload;
      state.cart = newCart;
    })

    .addMatcher(
      (action): action is PendingAction => action.type.endsWith("/pending"),
      (state, action) => {
        state.currentId = action.meta.requestId;
        if (state.currentId === action.meta.requestId) {
          state.isLoading = true;
        }
      }
    )
    .addMatcher(
      (action): action is FulfilledAction => action.type.endsWith("/fulfilled"),
      (state, action) => {
        if (state.isLoading && state.currentId === action.meta.requestId) {
          state.isLoading = false;
          state.isError = false;
        }
      }
    )
    .addMatcher(
      (action): action is RejectedAction => action.type.endsWith("/rejected"),
      (state, action) => {
        if (state.isLoading && state.currentId === action.meta.requestId) {
          state.isLoading = false;
          state.isError = true;
        }
      }
    );
});

export default productReducer;
