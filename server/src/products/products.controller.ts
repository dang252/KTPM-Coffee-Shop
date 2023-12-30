import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FollowRequest, ProductDetailDto, ProductsResponse } from './dto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get("/all")
    async findAllProduct(): Promise<ProductsResponse[]> {
        return this.productsService.findAllProduct();
    }

    @Get("/detail/:productId")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getProductById(@Param() params: any, @Query() query: any): Promise<ProductDetailDto> {
        return this.productsService.getProductDetails(params.productId, query?.userId)
    }

    @Get()
    async getProductByCategories(@Query('categories') categories: string) {
        const categoriesArray = categories.split(' ')
        return this.productsService.getProductByCategories(categoriesArray);
    }

    @Get("/follow")
    async followProduct(@Query() query: any) {
        const req = new FollowRequest;
        {
            req.productId = query.productId
            req.userId = query.userId
        }
        return this.productsService.followProduct(req)
    }

}
