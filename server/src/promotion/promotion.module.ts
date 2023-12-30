import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { CategoryPromotion, Message, ProductPromotion } from './entities/promotion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPromotion, CategoryPromotion, Message]), ProductsModule],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule { }
