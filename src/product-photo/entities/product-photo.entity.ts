/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('product_photo')
export class ProductPhoto {
  @PrimaryGeneratedColumn('uuid')
  photo_id!: string;

  @ManyToOne(() => Product, (product) => product.photos, {
    onDelete: 'CASCADE',
  })
  product!: Product;

  @Column()
  url!: string;

  @Column({ default: 0 })
  position!: number;

  @CreateDateColumn()
  created_at!: Date;
}
