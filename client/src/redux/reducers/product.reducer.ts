import { createReducer } from "@reduxjs/toolkit";

import { Product } from "../../types/product";

import { addProductToCart } from "../actions/product.action";

// Interface declair
interface UserState {
  sourceList: Product[];
  categoryList: Product[];
  cart: Product[];
}

// InitialState value
const initialState: UserState = {
  sourceList: [],
  categoryList: [],
  cart: [],
};

// createAsyncThunk middleware

const productReducer = createReducer(initialState, (builder) => {
  builder.addCase(addProductToCart, (state, action) => {
    const product: any = action.payload;
    state.cart.push(product);
  });
});

export default productReducer;
