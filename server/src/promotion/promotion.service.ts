import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { createPromotionRequest } from './dto/promotion.dto';
import { CategoryPromotion, Message, ProductPromotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { Products } from 'src/products/entities/product.entity';

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
    private readonly socketGateway: SocketGateway
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

  // async findPendignMessageOfUserId(userId: number) {
  //   return this.messageRepository.findBy({
  //     userId: userId,
  //     status: "PENDING"
  //   })
  // }

  // async updateMessageStatusById(messageId: number, status: string) {
  //   const message = await this.messageRepository.findOneBy({ messageId: messageId })
  //   message.status = status;
  //   this.messageRepository.save(message)
  // }

  async createProductPromotion(req: createPromotionRequest, repo: Repository<ProductPromotion>, msgRepo: Repository<Message>, productsService: ProductsService, socketGateway: SocketGateway) {
    try {
      const newPromotion = new ProductPromotion;
      {
        newPromotion.promotionName = req.promotionName;
        newPromotion.promotionDesc = req.promotionDesc;
        newPromotion.discountRate = req.discountRate;
        newPromotion.startDate = new Date(req.startDate)
        newPromotion.endDate = new Date(req.endDate)
        newPromotion.productIds = req.productIds;
      }
      //get all product name:
      const products = await productsService.findProductByIds(req.productIds)
      const productNames = products.map((product: Products) => {
        return product.productName;
      })
      // console.log(newPromotion)
      await repo.save(newPromotion)
      console.log("create message")
      let receivedUser = []
      for (let i = 0; i < req.productIds.length; i++) {
        const users = await productsService.findFollowerByProductId(req.productIds[i]);
        if (users) {
          receivedUser = receivedUser.concat(users);
        }
      }
      let message = "Sản phẩm bạn đang quan tâm cùng nhiều sản phẩm khác ("
      // add product name 
      const n = (productNames.length > 3) ? 3 : productNames.length
      for (let i = 0; i < n; i++) {
        message += productNames[i] + ", "
      }
      if (n > 1) {
        message += "..."
      }
      //
      message += ") hiện đang được khuyến mãi!"
      console.log(message)

      receivedUser = [...new Set(receivedUser)]
      for (let i = 0; i < receivedUser.length; i++) {
        const newMessage = new Message;
        {
          newMessage.userId = receivedUser[i]
          newMessage.status = "PENDING"
          newMessage.messageInfo = message
          newMessage.promotionId = newPromotion.promotionId
        }
        await msgRepo.save(newMessage)
        const canSendNoti = socketGateway.sendNotification({
          userId: newMessage.userId,
          message: newMessage.messageInfo,
          type: 'promotion',
          createdAt: newMessage.createdAt,
        })
        if (canSendNoti) {
          newMessage.status = "SENDED"
        }
        await msgRepo.save(newMessage)
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
    return this.mapTypePromotion2Action[req.promotionType](req, this.mapTypePromotion2Repo[req.promotionType], this.messageRepository, this.productsService, this.socketGateway);
    // this.createMessage(req)
  }
}
