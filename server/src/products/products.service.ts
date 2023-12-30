import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowerList, ProductImages, Products, Topping, ToppingForProduct } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { FollowRequest, ProductDetailDto, ProductsResponse } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
        @InjectRepository(Topping)
        private toppingRepository: Repository<Topping>,
        @InjectRepository(ToppingForProduct)
        private toppingForProductRepository: Repository<ToppingForProduct>,
        @InjectRepository(ProductImages)
        private productImagesRepository: Repository<ProductImages>,
        @InjectRepository(FollowerList)
        private followerListRepository: Repository<FollowerList>,
    ) {
        this.createSeedData()
    }
    async findAllProduct(): Promise<ProductsResponse[]> {
        const products = await this.productRepository.find();
        const res: ProductsResponse[] = []
        for (let i = 0; i < products.length; i++) {
            const newProduct = new ProductsResponse;
            {
                newProduct.product = products[i];
                newProduct.productImage = (await this.productImagesRepository.findOneBy({ productId: products[i].productId })).url
            }
            res.push(newProduct)
        }
        return res

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

    async getProductDetails(productId: number, userId?: number): Promise<ProductDetailDto> {
        const res = new ProductDetailDto();
        res.product = await this.findProductById(productId)
        res.productImages = await this.productImagesRepository.findBy({ productId: productId })
        const toppingForProduct = await this.findToppingIdsByProductId(productId);
        res.toppingList = toppingForProduct ? [...await this.findToppingsByIds(toppingForProduct.toppingIds)] : []
        res.isFollow = false;
        if (userId) {
            const followers = await this.followerListRepository.findOneBy({ productId: productId })
            if (followers) {
                res.isFollow = followers.userIds.includes(userId)
            }
        }
        return res;
    }

    async getProductByCategories(categories: string[]): Promise<ProductsResponse[]> {
        const query = `
            SELECT *
            FROM products
            WHERE categories @> $1::character varying[]
        `;

        const products = await this.productRepository.query(query, [categories]);
        const sortedProducts = products.sort((a, b) => a.productId - b.productId);
        const res: ProductsResponse[] = []
        for (let i = 0; i < sortedProducts.length; i++) {
            const newProduct = new ProductsResponse;
            {
                newProduct.product = sortedProducts[i];
                newProduct.productImage = (await this.productImagesRepository.findOneBy({ productId: sortedProducts[i].productId })).url
            }
            res.push(newProduct)
        }
        return res
    }

    async followProduct(req: FollowRequest) {
        if (!req.productId || !req.userId) {
            throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST)
        }
        try {
            console.log("start follow")
            console.log(req)
            const followers = await this.followerListRepository.findOneBy({ productId: req.productId })
            if (followers) {
                let isFollow = true;
                for (let i = 0; i <= followers.userIds.length; i++) {
                    if (followers.userIds[i] == req.userId) {
                        isFollow = true;
                    }
                }
                if (isFollow) {
                    followers.userIds = followers.userIds.filter((val) => val != req.userId)
                    await this.followerListRepository.save(followers)
                }
                else {
                    console.log("follow")
                    followers.userIds.push(req.userId)
                    await this.followerListRepository.save(followers)
                }
            }
            else {
                const newFollowerList = new FollowerList;
                {
                    newFollowerList.productId = req.productId;
                    newFollowerList.userIds = [req.userId]
                }
                await this.followerListRepository.save(newFollowerList)
            }
            return "success"
        }
        catch (error) {
            console.log(error)
            if (error instanceof HttpException) {
                throw error
            } else {
                throw new HttpException('INTERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
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
                categories: ['coffee', 'packed'],
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

        const productImages = [
            {
                imageId: 1,
                productId: 1,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1703877612/KTPM-coffee-shop/1_bc4awi.webp"
            },
            {
                imageId: 2,
                productId: 2,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1703877613/KTPM-coffee-shop/2_vfqepi.webp"
            },
            {
                imageId: 3,
                productId: 3,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1703877613/KTPM-coffee-shop/3_uhudke.webp"
            },
            {
                imageId: 4,
                productId: 4,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1703877613/KTPM-coffee-shop/4_k0v0bb.webp"
            },
            {
                imageId: 5,
                productId: 5,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1703877613/KTPM-coffee-shop/5_lbeq6u.webp"
            },
            {
                imageId: 6,
                productId: 6,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1703877613/KTPM-coffee-shop/6_dectpj.webp"
            },
            {
                imageId: 7,
                productId: 7,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1703877613/KTPM-coffee-shop/7_oszvj8.webp"
            },
        ]
        await this.toppingRepository.save(toppings);
        await this.productRepository.save(products);
        await this.toppingForProductRepository.save(productstopping);
        await this.productImagesRepository.save(productImages)
    }

}
