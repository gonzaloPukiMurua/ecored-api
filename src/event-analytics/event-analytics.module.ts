import { Module } from '@nestjs/common';
import { EventAnalyticsController } from './event-analytics.controller';
import { EventAnalyticsService } from './event-analytics.service';

@Module({
  controllers: [EventAnalyticsController],
  providers: [EventAnalyticsService]
})
export class EventAnalyticsModule {}
