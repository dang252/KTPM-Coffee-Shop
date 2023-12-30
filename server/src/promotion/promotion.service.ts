import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createPromotionRequest } from './dto/promotion.dto';
import { CategoryPromotion, ProductPromotion } from './entities/promotion.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(ProductPromotion)
    private productPromotionRepository: Repository<ProductPromotion>,
    @InjectRepository(CategoryPromotion)
    private categoryPromotionRepository: Repository<CategoryPromotion>,
    private dataSource: DataSource,
  ) { }

  findAll() {
    try {
      return `This action returns all promotion`;
    }
    catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('INTERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async createProductPromotion(req: createPromotionRequest, repo: Repository<ProductPromotion>) {
    try {
      console.log("createProductPromotion", req)
      const newPromotion = new ProductPromotion;
      {
        newPromotion.promotionName = req.promotionName;
        newPromotion.promotionDesc = req.promotionDesc;
        newPromotion.discountRate = req.discountRate;
        newPromotion.startDate = new Date(req.startDate)
        newPromotion.endDate = new Date(req.endDate)
        newPromotion.productIds = req.productIds;
      }
      console.log("newPromotion", newPromotion)
      await repo.save(newPromotion)
      console.log(this.productPromotionRepository)
      return newPromotion
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

  async createCategoryPromotion(req: createPromotionRequest, repo: Repository<CategoryPromotion>) {
    try {
      console.log("createCategoryPromotion", req)
      const newPromotion = new CategoryPromotion;
      {
        newPromotion.promotionName = req.promotionName;
        newPromotion.promotionDesc = req.promotionDesc;
        newPromotion.discountRate = req.discountRate;
        newPromotion.startDate = new Date(req.startDate)
        newPromotion.endDate = new Date(req.endDate)
        newPromotion.categories = req.categories;
      }
      console.log("newPromotion", newPromotion)
      await repo.save(newPromotion)
      return newPromotion
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

  mapTypePromotion2Action = {
    'product': this.createProductPromotion,
    'categories': this.createCategoryPromotion,
  }
  mapTypePromotion2Repo = {
    'product': this.productPromotionRepository,
    'categories': this.categoryPromotionRepository,
  }
  async createPromotion(req: createPromotionRequest) {
    console.log(req)
    return this.mapTypePromotion2Action[req.promotionType](req, this.mapTypePromotion2Repo[req.promotionType]);
  }
}
