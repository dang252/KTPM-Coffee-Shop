import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { createPromotionRequest } from './dto/promotion.dto';
import { CategoryPromotion, Message, ProductPromotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(ProductPromotion)
    private productPromotionRepository: Repository<ProductPromotion>,
    @InjectRepository(CategoryPromotion)
    private categoryPromotionRepository: Repository<CategoryPromotion>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
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

  createMessage = async (req: createPromotionRequest) => {
    console.log("create message")
    let receivedUser = []
    for (let i = 0; i < req.productIds.length; i++) {
      const users = await this.productsService.findFollowerByProductId(req.productIds[i]);
      if (users) {
        receivedUser = receivedUser.concat(users);
      }
    }
    for (let i = 0; i < receivedUser.length; i++) {
      const newMessage = new Message;
      {
        newMessage.userId = receivedUser[i]
        newMessage.status = "PENDING"
        newMessage.messageInfo = "Sản phẩm bạn quan tâm hiện đang được khuyến mãi!"
      }
    }
  }

  async createProductPromotion(req: createPromotionRequest, repo: Repository<ProductPromotion>, msgRepo: Repository<Message>, productsService: ProductsService) {
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
      await repo.save(newPromotion)
      console.log("create message")
      let receivedUser = []
      for (let i = 0; i < req.productIds.length; i++) {
        const users = await productsService.findFollowerByProductId(req.productIds[i]);
        if (users) {
          receivedUser = receivedUser.concat(users);
        }
      }
      receivedUser = [...new Set(receivedUser)]
      for (let i = 0; i < receivedUser.length; i++) {
        const newMessage = new Message;
        {
          newMessage.userId = receivedUser[i]
          newMessage.status = "PENDING"
          newMessage.messageInfo = "Sản phẩm bạn quan tâm hiện đang được khuyến mãi!"
          newMessage.promotionId = newPromotion.promotionId
        }
        msgRepo.save(newMessage)
      }
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
    return this.mapTypePromotion2Action[req.promotionType](req, this.mapTypePromotion2Repo[req.promotionType], this.messageRepository, this.productsService);
    // this.createMessage(req)
  }
}
