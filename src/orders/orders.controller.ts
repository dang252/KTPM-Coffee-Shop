import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { createOrderRequest, getOrderResponse } from './dto/order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post("/create")
  async createOrder(@Body() req: createOrderRequest) {
    return this.ordersService.createNewOrder(req);
  }
  @Get("/:orderId")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getOrderById(@Param() params: any): Promise<getOrderResponse> {
    return this.ordersService.getOrderById(params.orderId)
  }
}
