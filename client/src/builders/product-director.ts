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
    price: number,
    image: string
  ): Product {
    return new ProductBuilder()
      .setCategory("coffee")
      .setId(id)
      .setName(name)
      .setQuantity(quantity)
      .setSize(size)
      .setTopping(toppings)
      .setPrice(price)
      .setImage(image)
      .build();
  }
}

export class CoffeeCartDirector {
  static construct(
    cart_id: string,
    product_id: number,
    name: string,
    quantity: number,
    size: string,
    toppings: number[],
    price: number,
    image: string
  ): Product {
    return new ProductBuilder()
      .setCategory("coffee")
      .setCartId(cart_id)
      .setId(product_id)
      .setName(name)
      .setQuantity(quantity)
      .setSize(size)
      .setTopping(toppings)
      .setPrice(price)
      .setImage(image)
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
    price: number,
    image: string
  ): Product {
    return new ProductBuilder()
      .setCategory("tea")
      .setId(id)
      .setName(name)
      .setQuantity(quantity)
      .setSize(size)
      .setTopping(toppings)
      .setPrice(price)
      .setImage(image)
      .build();
  }
}
