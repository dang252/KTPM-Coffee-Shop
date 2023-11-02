import { createAction } from "@reduxjs/toolkit";

export const addProductToCart = createAction<string>(
  "products/addProductToCart"
);
