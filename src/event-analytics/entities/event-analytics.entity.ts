/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { Request } from '../../request/entities/request.entity';

export enum EventType {
  USER_SIGNED_UP = 'UserSignedUp',
  PUBLICATION_CREATED = 'PublicationCreated',
  VIEW = 'View',
  SEARCH_PERFORMED = 'SearchPerformed',
  REQUEST_SENT = 'RequestSent',
  REQUEST_ACCEPTED = 'RequestAccepted',
  REQUEST_REJECTED = 'RequestRejected',
  CONTACT_CLICKED = 'ContactClicked',
  DELIVERY_CONFIRMED = 'DeliveryConfirmed',
  REPORT_SUBMITTED = 'ReportSubmitted',
}

@Entity('events_analytics')
export class EventAnalytics {
  @PrimaryGeneratedColumn('uuid')
  event_id!: string;

  @Column({ type: 'enum', enum: EventType })
  event_type!: EventType;

  @ManyToOne(() => User, (user) => user.events, { nullable: true })
  user?: User;

  @ManyToOne(() => Product, { nullable: true })
  listing?: Product;

  @ManyToOne(() => Request, { nullable: true })
  request?: Request;

  @Column({ type: 'jsonb', nullable: true })
  payload?: Record<string, any>;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
