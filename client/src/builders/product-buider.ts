import { Product } from "./product";

interface IProductBuilder {
  product: Product;
  setId(id: number): this;
  setCartId(id: string): this;
  setName(name: string): this;
  setDescription(des: string): this;
  setCategory(cate: string): this;
  setQuantity(quantity: number): this;
  setPrice(price: number): this;
  setSize(size: string): this;
  setTopping(toppings: number[]): this;

  build(): Product;
}

export default class ProductBuilder implements IProductBuilder {
  product: Product;

  constructor() {
    this.product = new Product();
  }

  setId(id: number): this {
    this.product.id = id;
    return this;
  }

  setCartId(id: string): this {
    this.product.cart_id = id;
    return this;
  }

  setName(name: string): this {
    this.product.name = name;
    return this;
  }

  setDescription(des: string): this {
    this.product.description = des;
    return this;
  }

  setCategory(cate: string): this {
    this.product.category = cate;
    return this;
  }

  setQuantity(quantity: number): this {
    this.product.quantity = quantity;
    return this;
  }

  setPrice(price: number): this {
    this.product.price = price;
    return this;
  }

  setSize(size: string): this {
    this.product.size = size;
    return this;
  }

  setTopping(toppings: number[]): this {
    this.product.topping = toppings;
    return this;
  }

  build(): Product {
    return this.product;
  }
}
