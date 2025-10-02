/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum ReportTarget {
  LISTING = 'listing',
  USER = 'user',
}

export enum ReportStatus {
  OPEN = 'open',
  REVIEWED = 'reviewed',
  BLOCKED = 'blocked',
  IGNORED = 'ignored',
}

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  report_id!: string;

  @Column({ type: 'enum', enum: ReportTarget })
  target_type!: ReportTarget;

  @Column()
  target_id!: string; // flexible: puede ser user_id o product_id

  @ManyToOne(() => User, (user) => user.reports)
  reporter!: User;

  @Column()
  reason!: string;

  @Column({ type: 'enum', enum: ReportStatus, default: ReportStatus.OPEN })
  status!: ReportStatus;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ nullable: true })
  resolved_at?: Date;

  @ManyToOne(() => User, { nullable: true })
  resolver?: User;
}
