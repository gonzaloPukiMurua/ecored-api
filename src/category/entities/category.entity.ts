/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id!: string;

  @Column({ unique: true })
  name!: string;

  @ManyToOne(() => Category, (cat) => cat.children, { nullable: true })
  parent?: Category;

  @OneToMany(() => Category, (cat) => cat.parent)
  children?: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];

  @CreateDateColumn()
  created_at!: Date;
}
