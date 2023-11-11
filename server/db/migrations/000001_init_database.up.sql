-- Tạo bảng "users"
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    fullname VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(80),
    email VARCHAR(50),
    phone_number VARCHAR(20),
    dob TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng "products"
CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    product_name  VARCHAR(50),
    product_description VARCHAR(300),
    product_price BIGINT,
    categories_ids INT[]
);

--Tạo bảng "topping"
CREATE TABLE IF NOT EXISTS topping (
    topping_id SERIAL PRIMARY KEY,
    topping_name  VARCHAR(50),
    topping_price BIGINT
);

CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS sizes (
    product_id INT,
    size_name VARCHAR(15),
    size_price INT,
    PRIMARY KEY (product_id, size_name),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTs orders (
    order_id SERIAL PRIMARY KEY,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_status VARCHAR(15) DEFAULT 'CREATED',
    user_id INT,
    total_price BIGINT,
    shipping_info_address VARCHAR(100),
    shipping_info_phone VARCHAR(20),
    shipping_info_fee INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS order_details(
    detail_id SERIAL PRIMARY KEY,
    order_id int,
    product_id int,
    size_name VARCHAR(15),
    topping_ids INT[],
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id, size_name) REFERENCES sizes(product_id, size_name)
);

-- -- Tạo bảng "Orders" với khóa ngoại account_id
-- CREATE TABLE transactions (
--     id SERIAL PRIMARY KEY,
--     type VARCHAR(50),
--     amount BIGINT,
--     date DATE,
--     account_id INT,
--     FOREIGN KEY (account_id) REFERENCES bank_accounts(id)
-- );
