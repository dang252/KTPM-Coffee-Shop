import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
// import { dataSourceOptions } from 'db/dataSource';
// import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { PromotionModule } from './promotion/promotion.module';
import { NotifyModule } from './notify/notify.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: +5432,
      username: 'postgres',
      password: '123',
      database: 'thecoffeehouse',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // migrations: [__dirname + '/dist/db/migration/*{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    PromotionModule,
    NotifyModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
