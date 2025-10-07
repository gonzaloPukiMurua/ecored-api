/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventAnalyticsController } from './event-analytics.controller';
import { EventAnalyticsService } from './event-analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventAnalytics } from './entities/event-analytics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventAnalytics])],
  controllers: [EventAnalyticsController],
  providers: [EventAnalyticsService],
})
export class EventAnalyticsModule {}
