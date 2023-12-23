DROP TABLE IF EXISTS topping;

DROP TABLE IF EXISTS category;

DROP TABLE IF EXISTS size;

DROP TABLE IF EXISTS orderdetails;

DROP TABLE IF EXISTS order;

DROP TABLE IF EXISTS user;

DROP TABLE IF EXISTS toppingforproduct;

DROP TABLE IF EXISTS product;

-- Tạo bảng "users"
CREATE TABLE IF NOT EXISTS user (
    "userId" SERIAL PRIMARY KEY,
    "fullname" VARCHAR(50),
    "username" VARCHAR(50),
    "password" VARCHAR(80),
    "email" VARCHAR(50),
    "phoneNumber" VARCHAR(20),
);

-- Tạo bảng "products"
CREATE TABLE IF NOT EXISTS product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50),
    product_description VARCHAR(500),
    product_price BIGINT,
    upsize BIGINT [],
    categories_ids INT []
);

--Tạo bảng "topping"
CREATE TABLE IF NOT EXISTS topping (
    topping_id SERIAL PRIMARY KEY,
    topping_name VARCHAR(50),
    topping_price BIGINT
);

CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTs order (
    order_id SERIAL PRIMARY KEY,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_status VARCHAR(15) DEFAULT 'CREATED',
    user_id INT,
    total_price BIGINT,
    shipping_info_address VARCHAR(100),
    shipping_info_phone VARCHAR(20),
    shipping_info_fee INT DEFAULT 0,
    CONSTRAINT "orders_products_fk" FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS order_detail (
    detail_id SERIAL PRIMARY KEY,
    order_id int,
    product_id int,
    size_name VARCHAR(15),
    topping_ids INT [],
    CONSTRAINT "order_details_orders_fk" FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE IF NOT EXISTS toppingforproduct(
    product_id INT PRIMARY KEY,
    topping_ids INT [],
    CONSTRAINT "topping_drink_products_fk" FOREIGN KEY (product_id) REFERENCES products(product_id)
);