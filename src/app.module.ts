import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
// import { dataSourceOptions } from 'db/dataSource';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: +5432,
      username: "postgres",
      password: "123456",
      database: "KTPM-coffee-shop",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // migrations: [__dirname + '/dist/db/migration/*{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
