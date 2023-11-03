export interface Product {
  id: number;
  name: string;
  description?: string;
  category?: string;
  quantity?: number;
  price: number;
  size?: string;
  topping?: number[];
}

export interface CartProduct {
  cart_id: number;
  product_id: number;
  name: string;
  description?: string;
  category?: string;
  quantity?: number;
  price: number;
  size?: string;
  topping?: number[];
}
