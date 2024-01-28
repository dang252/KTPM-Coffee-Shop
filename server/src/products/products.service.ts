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

    async findProductByIds(ids: number[]): Promise<Products[]> {
        return this.productRepository.find({ where: { productId: In([...ids]) } });
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
                for (let i = 0; i <= followers.userIds.length; i++) {
                    if (followers.userIds[i] == userId) {
                        res.isFollow = true;
                    }
                }
            }
        }
        return res;
    }

    async findFollowerByProductId(productId: number) {
        const followers = (await this.followerListRepository.findOneBy({ productId: productId }))
        if (followers) {
            return followers.userIds
        }
        return null;
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
            const followers = await this.followerListRepository.findOneBy({ productId: req.productId })
            if (followers) {
                let isFollow = false;
                for (let i = 0; i <= followers.userIds.length; i++) {
                    if (followers.userIds[i] == req.userId) {
                        console.log(followers.userIds[i])
                        isFollow = true;
                    }
                }
                if (isFollow) {
                    followers.userIds = followers.userIds.filter((val) => val != req.userId)
                    await this.followerListRepository.save(followers)
                }
                else {
                    followers.userIds.push(req.userId)
                    console.log(followers)
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
            { toppingId: 10, toppingName: 'Sốt Caramel', toppingPrice: 10000 },
        ];
        const products = [
            {
                productId: 1,
                productName: 'CloudFee Hạnh Nhân Nướng',
                productDescription:
                    'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly.Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
                productPrice: 49000,
                upsize: [6000, 10000],
                categories: ['cloud', 'cloudfee', 'drink', 'bestseller'],
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
                categories: ['hi-tea', 'drink', 'bestseller'],
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
                productPrice: 59000,
                upsize: [],
                categories: ['packed-coffee', 'packed'],
            },
            {
                productId: 8,
                productName: 'Cà Phê Đen Đá Túi (30 gói x 16g)',
                productDescription:
                    'Cà Phê Đen Đá hoà tan The Coffee House với 100 % hạt cà phê Robusta mang đến hương vị mạnh cực bốc, đậm đắng đầy lôi cuốn, đúng gu người Việt.',
                productPrice: 110000,
                upsize: [],
                categories: ['packed-coffee', 'packed'],
            },
            {
                productId: 9,
                productName: 'Thùng Cà Phê Sữa Espresso',
                productDescription:
                    'Được sản xuất theo công nghệ Nhật, Cà Phê Sữa Espresso The Coffee House giữ trọn hương vị đậm đà của 100% cà phê Robusta nguyên chất quyện hoà cùng sữa béo thơm lừng. Bật nắp trải nghiệm ngay chất cà phê mạnh mẽ giúp sảng khoái tức thì, tuôn trào hứng khởi.',
                productPrice: 336000,
                upsize: [],
                categories: ['packed-coffee', 'packed'],
            },
            {
                productId: 10,
                productName: 'Trà Vị Đào Tearoma 14x14g',
                productDescription:
                    'Được chiết xuất từ 100% trà tự nhiên, không phẩm màu tổng hợp, Trà vị Đào Tearoma mang đến cảm giác thanh mát cực đã. Nhấp một ngụm, cảm nhận trọn vị đào chua ngọt thơm ngon bùng nổ. Ngoài ra, trà còn bổ sung vitamin C cực kỳ có lợi cho sức khoẻ.',
                productPrice: 32000,
                upsize: [],
                categories: ['packed-tea', 'packed'],
            },
            {
                productId: 11,
                productName: 'Trà Sữa Trân Châu Tearoma 250g',
                productDescription:
                    'Chỉ 2 phút có ngay ly Trà sữa trân châu ngon chuẩn vị quán. Thơm vị trà, béo vị sữa, cùng trân châu thật giòn dai sật sật. Đặc biệt, đây còn là thức uống tốt cho sức khoẻ nhờ thành phần 100% chiết xuất trà tự nhiên, không chất hoá học.',
                productPrice: 38000,
                upsize: [],
                categories: ['packed-tea', 'packed'],
            },
            {
                productId: 12,
                productName: 'Trà Long Nhãn Hạt Sen',
                productDescription:
                    'Thức uống mang hương vị của nhãn, của sen, của trà Oolong đầy thanh mát cho tất cả các thành viên trong dịp Tết này. An lành, thư thái và đậm đà chính là những gì The Coffee House mong muốn gửi trao đến bạn và gia đình.',
                productPrice: 49000,
                upsize: [10000, 16000],
                categories: ['tea', 'drink',],
            },
            {
                productId: 13,
                productName: 'Trà Đào Cam Sả Đá',
                productDescription:
                    'Chỉ 2 phút có ngay ly Trà sữa trân châu ngon chuẩn vị quán. Thơm vị trà, béo vị sữa, cùng trân châu thật giòn dai sật sật. Đặc biệt, đây còn là thức uống tốt cho sức khoẻ nhờ thành phần 100% chiết xuất trà tự nhiên, không chất hoá học.',
                productPrice: 38000,
                upsize: [10000, 16000],
                categories: ['tea', 'drink'],
            },
            {
                productId: 14,
                productName: 'Đường Đen Sữa Đá',
                productDescription:
                    'Nếu chuộng vị cà phê đậm đà, bùng nổ và thích vị đường đen ngọt thơm, Đường Đen Sữa Đá đích thị là thức uống dành cho bạn. Không chỉ giúp bạn tỉnh táo buổi sáng, Đường Đen Sữa Đá còn hấp dẫn đến ngụm cuối cùng bởi thạch cà phê giòn dai, nhai cực cuốn. - Khuấy đều trước khi sử dụng',
                productPrice: 45000,
                upsize: [4000, 10000],
                categories: ['coffee', 'drink'],
            },
            {
                productId: 15,
                productName: 'Cà Phê Sữa Nóng',
                productDescription:
                    'Cà phê được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.',
                productPrice: 39000,
                upsize: [],
                categories: ['coffee', 'drink'],
            },
            {
                productId: 16,
                productName: 'CloudFee Caramel',
                productDescription:
                    'Ngon khó cưỡng bởi xíu đắng nhẹ từ cà phê phin truyền thống pha trộn với Espresso lừng danh nước Ý, quyện vị kem sữa và caramel ngọt ngọt, thêm lớp foam trứng cacao bồng bềnh béo mịn, kèm topping thạch cà phê dai giòn nhai cực cuốn. Một thức uống "điểm mười" cho cả ngày tươi không cần tưới.',
                productPrice: 49000,
                upsize: [6000, 10000],
                categories: ['cloud', 'cloudfee', 'drink'],
            },
            {
                productId: 17,
                productName: 'CloudFee Hà Nội',
                productDescription:
                    'Khiến bạn mê mẩn ngay ngụm đầu tiên bởi vị đắng nhẹ của cà phê phin truyền thống kết hợp Espresso Ý, quyện hòa cùng chút ngọt ngào của kem sữa, và thơm béo từ foam trứng cacao. Nhấp một ngụm rồi nhai cùng thạch cà phê dai dai giòn giòn, đúng chuẩn "ngon quên lối về". CloudFee Classic là món đậm vị cà phê nhất trong bộ sưu tập nhưng không quá đắng, ngậy nhưng không hề ngấy.',
                productPrice: 49000,
                upsize: [6000, 10000],
                categories: ['cloud', 'cloudfee', 'drink'],
            },
            {
                productId: 18,
                productName: 'Hi Tea Yuzu Trân Châu',
                productDescription:
                    'Không chỉ nổi bật với sắc đỏ đặc trưng từ trà hoa Hibiscus, Hi-Tea Yuzu còn gây ấn tượng với topping Yuzu (quýt Nhật) lạ miệng, kết hợp cùng trân châu trắng dai giòn sần sật, nhai vui vui.',
                productPrice: 49000,
                upsize: [10000, 16000],
                categories: ['hi-tea', 'drink'],
            },
            {
                productId: 19,
                productName: 'Trà Xanh Latte',
                productDescription:
                    'Không cần đến Tây Bắc mới cảm nhận được sự trong trẻo của núi rừng, khi Trà Xanh Latte từ Nhà được chắt lọc từ những búp trà xanh mướt, ủ mình trong sương sớm. Trà xanh Tây Bắc vị thanh, chát nhẹ hoà cùng sữa tươi nguyên kem ngọt béo tạo nên hương vị dễ uống, dễ yêu. Đây là thức uống healthy, giúp bạn tỉnh táo một cách êm mượt, xoa dịu những căng thẳng.',
                productPrice: 45000,
                upsize: [4000, 10000],
                categories: ['matcha', 'drink'],
            },
            {
                productId: 20,
                productName: 'Trà Xanh Đường Đen',
                productDescription:
                    'Trà Xanh Đường Đen với hiệu ứng phân tầng đẹp mắt, như phác hoạ núi đồi Tây Bắc bảng lảng trong sương mây, thấp thoáng những nương chè xanh ngát. Từng ngụm là sự hài hoà từ trà xanh đậm đà, đường đen ngọt ngào, sữa tươi thơm béo. Khuấy đều trước khi dùng, để thưởng thức đúng vị',
                productPrice: 45000,
                upsize: [10000, 14000],
                categories: ['matcha', 'drink'],
            },
            {
                productId: 21,
                productName: 'Frosty Phin Gato',
                productDescription:
                    'Đá Xay Frosty Phin-Gato là lựa chọn không thể bỏ lỡ cho tín đồ cà phê. Cà phê nguyên chất pha phin truyền thống, thơm đậm đà, đắng mượt mà, quyện cùng kem sữa béo ngậy và đá xay mát lạnh. Nhân đôi vị cà phê nhờ có thêm thạch cà phê đậm đà, giòn dai. Thức uống khơi ngay sự tỉnh táo tức thì. Lưu ý: Khuấy đều phần đá xay trước khi dùng',
                productPrice: 55000,
                upsize: [10000, 14000],
                categories: ['ice-blended', 'drink'],
            },
            {
                productId: 22,
                productName: 'Frosty Cà Phê Đường Đen',
                productDescription:
                    'Đá Xay Frosty Cà Phê Đường Đen mát lạnh, sảng khoái ngay từ ngụm đầu tiên nhờ sự kết hợp vượt chuẩn vị quen giữa Espresso đậm đà và Đường Đen ngọt thơm. Đặc biệt, whipping cream beo béo cùng thạch cà phê giòn dai, đậm vị nhân đôi sự hấp dẫn, khơi bừng sự hứng khởi trong tích tắc.',
                productPrice: 45000,
                upsize: [6000, 10000],
                categories: ['ice-blended', 'drink'],
            },
        ]
        const productstopping = [
            {
                productId: 1,
                toppingIds: [2, 6, 7, 8, 9, 11]
            },
            {
                productId: 2,
                toppingIds: [2, 6, 7, 8, 9, 11]
            },
            {
                productId: 3,
                toppingIds: [1, 2, 3, 4, 5, 6]
            },
            {
                productId: 4,
                toppingIds: [2, 6, 7, 8, 9]
            },
            {
                productId: 12,
                toppingIds: [1, 4, 5, 8]
            },
            {
                productId: 13,
                toppingIds: [1, 4, 5, 6, 8]
            },
            {
                productId: 14,
                toppingIds: [6, 7, 8, 9, 11]
            },
            {
                productId: 15,
                toppingIds: [6, 7, 8, 9, 11]
            },
            {
                productId: 16,
                toppingIds: [6, 7, 8, 9, 11]
            },
            {
                productId: 17,
                toppingIds: [6, 7, 8, 9, 11]
            },
            {
                productId: 18,
                toppingIds: [1, 3, 4, 5, 6]
            },
            {
                productId: 19,
                toppingIds: [6, 7, 8, 9]
            },
            {
                productId: 20,
                toppingIds: [6, 7, 8, 9]
            },
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
            {
                imageId: 8,
                productId: 8,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347402/KTPM-coffee-shop/8_z29wjp.webp"
            },
            {
                imageId: 9,
                productId: 9,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347151/KTPM-coffee-shop/9_ijbgdi.webp"
            },
            {
                imageId: 10,
                productId: 10,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347148/KTPM-coffee-shop/10_jduhqu.webp"
            },
            {
                imageId: 11,
                productId: 11,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347148/KTPM-coffee-shop/11_lsvbp3.webp"
            },
            {
                imageId: 12,
                productId: 12,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347148/KTPM-coffee-shop/12_odaxkp.webp"
            },
            {
                imageId: 13,
                productId: 13,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347148/KTPM-coffee-shop/13_fwqoly.webp"
            },
            {
                imageId: 14,
                productId: 14,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347149/KTPM-coffee-shop/14_m4v7jy.webp"
            },
            {
                imageId: 15,
                productId: 15,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347149/KTPM-coffee-shop/15_luldqq.webp"
            },
            {
                imageId: 16,
                productId: 16,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347148/KTPM-coffee-shop/16_trdlbv.webp"
            },
            {
                imageId: 17,
                productId: 17,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347149/KTPM-coffee-shop/17_jwzayw.webp"
            },
            {
                imageId: 18,
                productId: 18,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347149/KTPM-coffee-shop/18_rrlbrw.webp"
            },
            {
                imageId: 19,
                productId: 19,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347149/KTPM-coffee-shop/19_xzi23r.webp"
            },
            {
                imageId: 20,
                productId: 20,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347149/KTPM-coffee-shop/20_vjch22.webp"
            },
            {
                imageId: 21,
                productId: 21,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347150/KTPM-coffee-shop/21_awg6xk.webp"
            },
            {
                imageId: 22,
                productId: 22,
                url: "https://res.cloudinary.com/dxsprhbls/image/upload/v1706347149/KTPM-coffee-shop/22_kk9dej.webp"
            },
        ]
        await this.toppingRepository.save(toppings);
        await this.productRepository.save(products);
        await this.toppingForProductRepository.save(productstopping);
        await this.productImagesRepository.save(productImages)
    }

}
