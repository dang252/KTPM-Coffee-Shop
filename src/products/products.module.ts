import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products, Topping, ToppingForProduct } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Topping, ToppingForProduct])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule { }
