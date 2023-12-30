import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/promotion/entities/promotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [SocketGateway, SocketService],
  exports: [SocketService, SocketGateway]
})
export class SocketModule { }
