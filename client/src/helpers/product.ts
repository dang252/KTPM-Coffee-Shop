import { Product } from "../types/product";

export const checkProductCartExist = (id: number, source: Product[]) => {
  for (let i = 0; i < source.length; ++i) if (source[i].id === id) return true;
  return false;
};
