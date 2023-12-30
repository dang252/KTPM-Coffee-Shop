export class Product {
  id = 0;
  cart_id = "";
  name = "";
  description = "";
  category = "";
  quantity = 0;
  price = 0;
  size = "";
  topping = [0];
  image = "";

  construction(): Product {
    return new Product();
  }
}
