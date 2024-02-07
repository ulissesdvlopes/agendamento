import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Scheduling } from './scheduling.entity';
import { CreateSchedulingDto } from './dtos/create-scheduling.dto';
import { UpdateSchedulingDto } from './dtos/update-scheduling.dto';

@Injectable()
export class SchedulingService {

    constructor(
        @InjectRepository(Scheduling)
        private readonly schedulingRepository: Repository<Scheduling>,
    ) {}

    getAllSchedulings(): Promise<Scheduling[]> {
        return this.schedulingRepository.find()
    }

    getSchedulingById(id: number): Promise<Scheduling> {
        return this.schedulingRepository.findOneBy({id: id})
    }

    createScheduling(createschedulingDto: CreateSchedulingDto): Promise<Scheduling> {
        const scheduling: Scheduling = new Scheduling();
        scheduling.vehicle = createschedulingDto.vehicle;
        scheduling.date = createschedulingDto.date;
        return this.schedulingRepository.save(scheduling);
    }

    updateScheduling(id: number, updateSchedulingDto: UpdateSchedulingDto): Promise<UpdateResult> {
        return this.schedulingRepository.update(id, updateSchedulingDto)
    }

    deleteScheduling(id: number): Promise<DeleteResult> {
        return this.schedulingRepository.delete(id)
    }

}
