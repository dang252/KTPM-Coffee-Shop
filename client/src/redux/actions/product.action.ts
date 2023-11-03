import { createAction } from "@reduxjs/toolkit";

export const addProductToCart = createAction<string>(
  "products/addProductToCart"
);

export const removeProductToCart = createAction<string>(
  "products/removeProductToCart"
);

export const increaseProductToCart = createAction<string>(
  "products/increaseProductToCart"
);

export const decreaseProductToCart = createAction<string>(
  "products/decreaseProductToCart"
);

export const updateCart = createAction<string>("products/updateCart");
