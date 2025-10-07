/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductPhotoController } from './product-photo.controller';
import { ProductPhotoService } from './product-photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPhoto } from './entities/product-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPhoto])],
  controllers: [ProductPhotoController],
  providers: [ProductPhotoService],
})
export class ProductPhotosModule {}
