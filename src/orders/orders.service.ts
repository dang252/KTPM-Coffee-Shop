import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderDetail } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { createOrderRequest, createOrderRequestDetail } from './dto/order.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private OrderDetailRepository: Repository<OrderDetail>,
    private dataSource: DataSource,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
  ) { }

  async getOrderByOrderId(orderId: number): Promise<Order> {
    return this.OrderRepository.findOneBy({ orderId: orderId })
  }

  async getOrderByUserId(userId: number): Promise<Order[]> {
    return this.OrderRepository.findBy({ userId: userId })
  }

  async calcProductTotalPrice(detail: createOrderRequestDetail) {
    let total = 0;
    const product = await this.productsService.findProductById(detail.productId);
    if (!product) {
      throw new HttpException('PRODUCT NOT FOUND', HttpStatus.BAD_REQUEST)
    }
    total = total + product.productPrice;
    if (detail.size && detail.size == "m")
      total += product.upsize[0];
    else if (detail.size && detail.size == "l")
      total += product.upsize[1];

    if (detail.toppingIds) {
      const toppings = await this.productsService.findToppingsByIds(detail.toppingIds);
      for (let j = 0; j < toppings.length; j++) {
        total += toppings[j].toppingPrice
      }
    }

    return total
  }

  async calcTotalPrice(details: createOrderRequestDetail[]) {
    let total = 0;
    for (let i = 0; i < details.length; i++) {
      total += (await this.calcProductTotalPrice(details[i])) * details[i].quantity
    }
    return total
  }

  async createNewOrder(req: createOrderRequest) {
    try {
      const newOrder = new Order();
      //createOrder
      {
        newOrder.userId = req.userId;
        newOrder.totalPrice = await this.calcTotalPrice(req.detail)
        newOrder.shippingInfoPhone = req.shippingInfoPhone;
        newOrder.shippingInfoAddress = req.shippingInfoAddress;
        newOrder.shippingInfoFee = req.shippingInfoFee
      }
      await this.dataSource.transaction(async (manager) => {
        await manager.save(newOrder)
        const detail = req.detail.map((productDetail) => {
          const newDetail = new OrderDetail()
          {
            newDetail.orderId = newOrder.orderId;
            newDetail.productId = productDetail.productId;
            newDetail.size = productDetail.size;
            newDetail.quantity = productDetail.quantity
            newDetail.toppingIds = productDetail.toppingIds;
          }
          return newDetail
        })
        for (let i = 0; i < detail.length; i++) {
          await manager.save(detail[i]);
        }
      })
      return newOrder
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

  // async createOrderDetailResponse() {
  //   const res = new getOrderResponse()
  //   res.orderId =
  // }
}
