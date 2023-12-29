import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { CategoryPromotion, ProductPromotion } from './entities/promotion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPromotion, CategoryPromotion])],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule { }
