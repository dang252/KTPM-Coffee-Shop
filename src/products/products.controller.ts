import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDetailDto, ProductsResponse } from './dto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get("/all")
    async findAllProduct(): Promise<ProductsResponse[]> {
        return this.productsService.findAllProduct();
    }

    @Get("/:productId")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getProductById(@Param() params: any): Promise<ProductDetailDto> {
        return this.productsService.getProductDetails(params.productId)
    }

    @Get()
    async getProductByCategories(@Query('categories') categories: string) {
        const categoriesArray = categories.split(' ')
        return this.productsService.getProductByCategories(categoriesArray);
    }


}
