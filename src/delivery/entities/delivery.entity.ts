/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Request } from '../../request/entities/request.entity';

export enum ConfirmedBy {
  OWNER = 'owner',
  REQUESTER = 'requester',
}

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  delivery_id!: string;

  @OneToOne(() => Request, (request) => request.delivery, { onDelete: 'CASCADE' })
  @JoinColumn()
  request!: Request;

  @Column({ type: 'enum', enum: ConfirmedBy })
  confirmed_by!: ConfirmedBy;

  @CreateDateColumn()
  confirmed_at!: Date;
}
