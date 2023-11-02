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
