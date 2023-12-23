import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products, Topping, ToppingForProduct } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { ProductDetailDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
        @InjectRepository(Topping)
        private toppingRepository: Repository<Topping>,
        @InjectRepository(ToppingForProduct)
        private toppingForProductRepository: Repository<ToppingForProduct>,
    ) {
        this.createSeedData()
    }
    async findAllProduct(): Promise<Products[]> {
        return this.productRepository.find();
    }

    async findProductById(id: number): Promise<Products> {
        return this.productRepository.findOneBy({ productId: id });
    }

    async findToppingById(id: number): Promise<Topping> {
        return this.toppingRepository.findOneBy({ toppingId: id });
    }

    async findToppingsByIds(ids: number[]): Promise<Topping[]> {
        return this.toppingRepository.find({ where: { toppingId: In([...ids]) } });
    }

    async findToppingIdsByProductId(id: number): Promise<ToppingForProduct> {
        return this.toppingForProductRepository.findOneBy({ productId: id })
    }

    // async findProductsByCategories(cate)

    async getProductDetails(productId: number): Promise<ProductDetailDto> {
        const res = new ProductDetailDto();
        res.product = await this.findProductById(productId)
        const toppingForProduct = await this.findToppingIdsByProductId(productId);
        res.toppingList = toppingForProduct ? [...await this.findToppingsByIds(toppingForProduct.toppingIds)] : []
        return res;
    }



    //create seed data
    async createSeedData() {
        const toppings = [
            { toppingId: 1, toppingName: 'Đào Miếng', toppingPrice: 10000 },
            { toppingId: 2, toppingName: 'Thạch Oolong Nướng', toppingPrice: 10000 },
            { toppingId: 3, toppingName: 'Trái nhãn', toppingPrice: 10000 },
            { toppingId: 4, toppingName: 'Trái Vải', toppingPrice: 10000 },
            { toppingId: 5, toppingName: 'Hạt Sen', toppingPrice: 10000 },
            { toppingId: 6, toppingName: 'Trân Châu Trắng', toppingPrice: 10000 },
            { toppingId: 7, toppingName: 'Thạch Cà Phê', toppingPrice: 10000 },
            { toppingId: 8, toppingName: 'Kem Phô Mai Macchiato', toppingPrice: 10000 },
            { toppingId: 9, toppingName: 'Shot Espresso', toppingPrice: 10000 },
            { toppingId: 10, toppingName: 'Bánh Flan', toppingPrice: 15000 },
        ];
        const products = [
            {
                productId: 1,
                productName: 'CloudFee Hạnh Nhân Nướng',
                productDescription:
                    'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly.Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
                productPrice: 49000,
                upsize: [6000, 10000],
                categories: ['coffee', 'drink', 'bestseller'],
            },
            {
                productId: 2,
                productName: 'The Coffee House Sữa Đá',
                productDescription:
                    'Thức uống giúp tỉnh táo tức thì để bắt đầu ngày mới thật hứng khởi.Không đắng khét như cà phê truyền thống, The Coffee House Sữa Đá mang hương vị hài hoà đầy lôi cuốn. Là sự đậm đà của 100 % cà phê Arabica Cầu Đất rang vừa tới,biến tấu tinh tế với sữa đặc và kem sữa ngọt ngào cực quyến rũ.Càng hấp dẫn hơn với topping thạch 100 % cà phê nguyên chất giúp giữ trọn vị ngon đến ngụm cuối cùng.',
                productPrice: 39000,
                upsize: [6000, 10000],
                categories: ['coffee', 'drink', 'bestseller'],
            },
            {
                productId: 3,
                productName: 'Hi Tea Vải',
                productDescription:
                    'Chút ngọt ngào của Vải, mix cùng vị chua thanh tao từ trà hoa Hibiscus, mang đến cho bạn thức uống đúng chuẩn vừa ngon, vừa healthy.',
                productPrice: 49000,
                upsize: [10000, 16000],
                categories: ['tea', 'drink', 'bestseller'],
            },
            {
                productId: 4,
                productName: 'Cà Phê Sữa Đá',
                productDescription:
                    'Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.',
                productPrice: 29000,
                upsize: [10000, 16000],
                categories: ['coffee', 'drink', 'bestseller'],
            },
            {
                productId: 5,
                productName: 'Bánh Mì VN Thịt Nguội',
                productDescription:
                    'Gói gọn trong ổ bánh mì Việt Nam là từng lớp chả, từng lớp jambon hòa quyện cùng bơ và pate thơm lừng, thêm dưa rau cho bữa sáng đầy năng lượng.* Phần bánh sẽ ngon và đậm đà nhất khi kèm pate.Để đảm bảo hương vị được trọn vẹn, Nhà mong bạn thông cảm vì không thể thay đổi định lượng pate.',
                productPrice: 39000,
                upsize: [],
                categories: ['food', 'bestseller'],
            },
            {
                productId: 6,
                productName: 'Mochi Kem Chocolate',
                productDescription:
                    'Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân chocolate độc đáo.Gọi 1 chiếc Mochi cho ngày thật tươi mát.Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.',
                productPrice: 19000,
                upsize: [],
                categories: ['food', 'bestseller'],
            },
            {
                productId: 7,
                productName: 'Cà Phê Đen Đá Hộp (14 gói x 16g)',
                productDescription:
                    'Cà Phê Đen Đá hoà tan The Coffee House với 100 % hạt cà phê Robusta mang đến hương vị mạnh cực bốc, đậm đắng đầy lôi cuốn, đúng gu người Việt.',
                productPrice: 39000,
                upsize: [],
                categories: ['coffee', 'product'],
            },
        ]
        const productstopping = [
            {
                productId: 1,
                toppingIds: [2, 6, 7, 8, 9]
            },
            {
                productId: 2,
                toppingIds: [2, 6, 7, 8, 9]
            },
            {
                productId: 3,
                toppingIds: [1, 2, 3, 4, 5, 6]
            },
            {
                productId: 4,
                toppingIds: [2, 6, 7, 8, 9]
            }
        ]
        await this.toppingRepository.save(toppings);
        await this.productRepository.save(products);
        await this.toppingForProductRepository.save(productstopping);
    }

}
