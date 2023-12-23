-- -- insert categories
-- INSERT INTO
--     category ("categoryName")
-- VALUES
--     ('coffee');

-- --2
-- INSERT INTO
--     category ("categoryName")
-- VALUES
--     ('tea');

-- --3
-- INSERT INTO
--     category ("categoryName")
-- VALUES
--     ('ice blended');

-- --4
-- INSERT INTO
--     category ("categoryName")
-- VALUES
--     ('food');

-- --5
-- INSERT INTO
--     category ("categoryName")
-- VALUES
--     ('snack');

-- --6
-- INSERT INTO
--     category ("categoryName")
-- VALUES
--     ('drink');

-- --7
-- INSERT INTO
--     category ("categoryName")
-- VALUES
--     ('products');

-- insert topping
-- 1
INSERT INTO
    topping ("toppingId", "toppingName", "toppingPrice")
VALUES
    (1, 'Đào Miếng', 10000);

-- 2
INSERT INTO
    topping ("toppingId", "toppingName", "toppingPrice")
VALUES
    (2, 'Thạch Oolong Nướng', 10000);

-- 3
INSERT INTO
    topping ("toppingId", "toppingName", "toppingPrice")
VALUES
    (3, 'Trái nhãn', 10000);

-- 4
INSERT INTO
    topping ("toppingId", "toppingName", "toppingPrice")
VALUES
    (4, 'Trái Vải', 10000);

-- 5
INSERT INTO
    topping ("toppingId", "toppingName", "toppingPrice")
VALUES
    (5, 'Hạt Sen', 10000);

-- 6
INSERT INTO
    topping ("toppingId", "toppingName", "toppingPrice")
VALUES
    (6, 'Trân Châu Trắng', 10000);

-- 7
INSERT INTO
    topping ("toppingId", "toppingName", "toppingPrice")
VALUES
    (7, 'Thạch Cà Phê', 10000);

-- 8
INSERT INTO
    topping ("toppingId", "toppingName", "toppingPrice")
VALUES
    (8, 'Kem Phô Mai Macchiato', 10000);

-- 9
INSERT INTO
    topping ("toppingId", "toppingName", "toppingPrice")
VALUES
    (9, 'Shot Espresso', 10000);

-- 10
INSERT INTO
    topping ("toppingId", "toppingName", "toppingPrice")
VALUES
    (10, 'Bánh Flan', 15000);

-- products & topping
-- 1
INSERT INTO
    products (
        "productId",
        "productName",
        "productDescription",
        "productPrice",
        "upsize",
        "categoriesIds"
    )
VALUES
    (
        1,
        'CloudFee Hạnh Nhân Nướng',
        'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly.Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
        49000,
        ARRAY [6000, 10000],
        ARRAY ['coffee', 'drink']
    );

INSERT INTO
    topping_for_product ("productId", "toppingIds")
VALUES
    (1, ARRAY [2, 6, 7, 8, 9]);

-- 2
INSERT INTO
    products (
        "productId",
        "productName",
        "productDescription",
        "productPrice",
        "upsize",
        "categoriesIds"
    )
VALUES
    (
        2,
        'The Coffee House Sữa Đá',
        'Thức uống giúp tỉnh táo tức thì để bắt đầu ngày mới thật hứng khởi.Không đắng khét như cà phê truyền thống, The Coffee House Sữa Đá mang hương vị hài hoà đầy lôi cuốn. Là sự đậm đà của 100 % cà phê Arabica Cầu Đất rang vừa tới,biến tấu tinh tế với sữa đặc và kem sữa ngọt ngào cực quyến rũ.Càng hấp dẫn hơn với topping thạch 100 % cà phê nguyên chất giúp giữ trọn vị ngon đến ngụm cuối cùng.',
        39000,
        ARRAY [6000, 10000],
        ARRAY ['coffee', 'drink']
    );

INSERT INTO
    topping_for_product ("productId", "toppingIds")
VALUES
    (2, ARRAY [2, 6, 7, 8, 9]);

-- 3
INSERT INTO
    products (
        "productId",
        "productName",
        "productDescription",
        "productPrice",
        "upsize",
        "categoriesIds"
    )
VALUES
    (
        3,
        'Hi Tea Vải',
        'Chút ngọt ngào của Vải, mix cùng vị chua thanh tao từ trà hoa Hibiscus, mang đến cho bạn thức uống đúng chuẩn vừa ngon, vừa healthy.',
        49000,
        ARRAY [10000, 16000],
        ARRAY ['tea', 'drink']
    );

INSERT INTO
    topping_for_product ("productId", "toppingIds")
VALUES
    (3, ARRAY [1, 2, 3, 4, 5, 6]);

-- 4
INSERT INTO
    products (
		"productId",
        "productName",
        "productDescription",
        "productPrice",
        "upsize",
        "categoriesIds"
    )
VALUES
    (
		4,
        'Cà Phê Sữa Đá',
        'Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.',
        29000,
        ARRAY [10000, 16000],
        ARRAY ['coffee', 'drink']
    );

INSERT INTO
    topping_for_product ("productId", "toppingIds")
VALUES
    (4, ARRAY [2, 6, 7, 8, 9]);

-- 5
INSERT INTO
    products (
        "productId",
        "productName",
        "productDescription",
        "productPrice",
		"upsize",
        "categoriesIds"
    )
VALUES
    (
        5,
        'Bánh Mì VN Thịt Nguội',
        'Gói gọn trong ổ bánh mì Việt Nam là từng lớp chả, từng lớp jambon hòa quyện cùng bơ và pate thơm lừng, thêm dưa rau cho bữa sáng đầy năng lượng.* Phần bánh sẽ ngon và đậm đà nhất khi kèm pate.Để đảm bảo hương vị được trọn vẹn, Nhà mong bạn thông cảm vì không thể thay đổi định lượng pate.',
        39000,
		ARRAY []::integer[],
        ARRAY ['food']
    );

-- 6
INSERT INTO
    products (
        "productId",
        "productName",
        "productDescription",
        "productPrice",
        "upsize",
        "categoriesIds"
    )
VALUES
    (
        6,
        'Mochi Kem Chocolate',
        'Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân chocolate độc đáo.Gọi 1 chiếc Mochi cho ngày thật tươi mát.Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.',
        19000,
        ARRAY []::integer[],
        ARRAY ['food']
    );

-- 7
INSERT INTO
    products (
        "productId",
        "productName",
        "productDescription",
        "productPrice",
        "upsize",
        "categoriesIds"
    )
VALUES
    (
        7,
        'Cà Phê Đen Đá Hộp (14 gói x 16g)',
        'Cà Phê Đen Đá hoà tan The Coffee House với 100 % hạt cà phê Robusta mang đến hương vị mạnh cực bốc, đậm đắng đầy lôi cuốn, đúng gu người Việt.',
        58000,
        ARRAY []::integer[],
        ARRAY ['coffee', 'product']
    );