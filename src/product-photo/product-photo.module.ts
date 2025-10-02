import { Module } from '@nestjs/common';
import { ProductPhotoController } from './product-photo.controller';
import { ProductPhotoService } from './product-photo.service';

@Module({
  controllers: [ProductPhotoController],
  providers: [ProductPhotoService],
})
export class ProductPhotos {}
