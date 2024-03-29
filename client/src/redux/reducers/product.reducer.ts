import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

import { Product, CartProduct } from "../../types/product";

import {
  PendingAction,
  FulfilledAction,
  RejectedAction,
} from "../../types/reduxthunk.type";

import {
  addProductToCart,
  removeProductToCart,
  increaseProductToCart,
  decreaseProductToCart,
  updateCart,
} from "../actions/product.action";
import axios from "axios";

// Interface declair
interface ProductState {
  currentId: string;
  productList: any[];
  categoryList: Product[];
  cart: CartProduct[];
  isLoading: boolean;
  isError: boolean;
}

// InitialState value
const initialState: ProductState = {
  currentId: "",
  productList: [],
  categoryList: [],
  cart: [],
  isLoading: false,
  isError: false,
};

export const getProductsByCategories = createAsyncThunk(
  "products/getByCategories",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (params: string[], thunkAPI) => {
    try {
      let queryString = "";
      for (let i = 0; i < params.length; i++) {
        queryString += queryString == "" ? params[i] : "+" + params[i];
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/`,
        {
          params: {
            categories: queryString,
          },
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "products/getDetail",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (req: { productId: number; userId?: number }, thunkAPI) => {
    try {
      let query = "";
      if (req.userId) {
        query = `?userId=${req.userId}`;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/detail/${req.productId + query
        }`,
        {}
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const followProduct = createAsyncThunk(
  "products/follow",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (req: { productId: number; userId: number }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/follow?productId=${req.productId
        }&userId=${req.userId}`,
        {}
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cartConfirm = createAsyncThunk(
  "products/cartConfirm",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (cart: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/create`,
        {
          userId: cart.userId,
          shippingInfoAddress: cart.shippingInfoAddress,
          shippingInfoPhone: cart.shippingInfoPhone,
          shippingInfoFee: 0,
          detail: cart.detail,
        }
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDetailBill = createAsyncThunk(
  "products/getDetailBill",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (orderId: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        {}
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserBillHistory = createAsyncThunk(
  "products/getUserBillHistory",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (userId: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/history?userId=${userId}`,
        {}
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/all`,
        {}
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProductsByCategories.fulfilled, (state, action) => {
      state.productList = action.payload;
    })
    .addCase(getProductsByCategories.rejected, (state, _) => {
      state.productList = [];
    })
    .addCase(addProductToCart, (state, action) => {
      const product: any = action.payload;
      console.log(product);
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
