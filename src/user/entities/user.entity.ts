/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Request } from '../../request/entities/request.entity';
import { Report } from '../../report/entities/report.entity';
import { EventAnalytics } from '../../event-analytics/entities/event-analytics.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Column({ default: false })
  is_verified!: boolean;

  @Column()
  password!: string;

  @Column({ nullable: true })
  zone_text?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  // Relations
  @OneToMany(() => Product, (product) => product.owner)
  products: Product[] = [];

  @OneToMany(() => Request, (request) => request.requester)
  requests: Request[] = [];

  @OneToMany(() => Report, (report) => report.reporter)
  reports: Report[] = [];

  @OneToMany(() => EventAnalytics, (event) => event.user)
  events: EventAnalytics[] = [];
}
