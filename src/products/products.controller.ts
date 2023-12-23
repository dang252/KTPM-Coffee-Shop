import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './entities/product.entity';
import { ProductDetailDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get("/all")
    async findAllProduct(): Promise<Products[]> {
        return this.productsService.findAllProduct();
    }

    @Get("/:productId")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findProductById(@Param() params: any): Promise<ProductDetailDto> {
        return this.productsService.getProductDetails(params.productId)
    }
}
