import { Body, Controller, Post } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { createOrderRequest } from './dto/order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post("/create")
  async createOrder(@Body() req: createOrderRequest) {
    return this.ordersService.createNewOrder(req);
  }

}
