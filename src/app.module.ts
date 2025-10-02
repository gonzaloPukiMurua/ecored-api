/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config/typeorm';
import { ProductModule } from './product/product.module';
import { AssetModule } from './product-photo/product-photo.module';
import { CategoryModule } from './category/category.module';
import { RequestModule } from './request/request.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ReportModule } from './report/report.module';
import { EventAnalyticsModule } from './event-analytics/event-analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    TypeOrmModule.forRoot(dbConfig),
    AuthModule, 
    UserModule, ProductModule, AssetModule, CategoryModule, RequestModule, DeliveryModule, ReportModule, EventAnalyticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
