import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product.reducer";
import persistedReducer from "./persisted.reducer";

export const rootReducer = combineReducers({
  persisted: persistedReducer,
  product: productReducer,
});
