import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scheduling } from './scheduling.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scheduling])],
  providers: [SchedulingService],
  controllers: [SchedulingController]
})
export class SchedulingModule {}
