import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import productReducer from "./product.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});
