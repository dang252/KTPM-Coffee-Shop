import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImages, Products, Topping, ToppingForProduct } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Topping, ToppingForProduct, ProductImages])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule { }
