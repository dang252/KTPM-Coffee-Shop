import { Body, Controller, Get, Post } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { createPromotionRequest } from './dto/promotion.dto';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) { }

  @Get()
  findAll() {
    return this.promotionService.findAll();
  }

  @Post("/create")
  async createPromotion(@Body() req: createPromotionRequest) {
    return this.promotionService.createPromotion(req);
  }

}
