// A Director Class
import { Product } from "./product";
import ProductBuilder from "./product-buider";

export class CoffeeDirector {
  static construct(
    id: number,
    name: string,
    quantity: number,
    size: string,
    toppings: number[],
    price: number
  ): Product {
    return new ProductBuilder()
      .setCategory("coffee")
      .setId(id)
      .setName(name)
      .setQuantity(quantity)
      .setSize(size)
      .setTopping(toppings)
      .setPrice(price)
      .build();
  }
}

export class TeaDirector {
  static construct(
    id: number,
    name: string,
    quantity: number,
    size: string,
    toppings: number[],
    price: number
  ): Product {
    return new ProductBuilder()
      .setCategory("tea")
      .setId(id)
      .setName(name)
      .setQuantity(quantity)
      .setSize(size)
      .setTopping(toppings)
      .setPrice(price)
      .build();
  }
}
