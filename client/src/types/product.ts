export interface Product {
  id: number;
  name: string;
  description?: string;
  category?: string[];
  quantity?: number;
  price: number;
  size?: string;
  topping?: number[];
  url?: string;
  image?: string;
}

export interface CartProduct {
  cart_id: string;
  product_id: number;
  name: string;
  description?: string;
  category?: string;
  quantity?: number;
  price: number;
  size?: string;
  topping?: number[];
  image?: string;
}
