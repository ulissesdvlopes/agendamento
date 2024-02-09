import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Scheduling } from './scheduling.entity';
import { CreateSchedulingDto } from './dtos/create-scheduling.dto';
import { UpdateSchedulingDto } from './dtos/update-scheduling.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SchedulingService {

    constructor(
        @InjectRepository(Scheduling)
        private readonly schedulingRepository: Repository<Scheduling>,
    ) {}

    getAllSchedulings(user: User): Promise<Scheduling[]> {
        return this.schedulingRepository.find({
            where: { client: user }
        })
    }

    async getSchedulingById(id: number, user: User): Promise<Scheduling> {
        const scheduling: Scheduling = await this.schedulingRepository.findOne({where: {id}, relations:{ client: true}});
        this.verifySchedulingExistence(scheduling);
        this.handleUserPermission(scheduling, user);
        return scheduling;
    }

    createScheduling(createschedulingDto: CreateSchedulingDto, user: User): Promise<Scheduling> {
        const scheduling: Scheduling = new Scheduling();
        scheduling.vehicle = createschedulingDto.vehicle;
        scheduling.date = createschedulingDto.date;
        scheduling.client = user;
        return this.schedulingRepository.save(scheduling);
    }

    async updateScheduling(id: number, updateSchedulingDto: UpdateSchedulingDto, user: User): Promise<UpdateResult> {
        const scheduling: Scheduling = await this.schedulingRepository.findOne({where: {id}, relations:{ client: true}});
        this.verifySchedulingExistence(scheduling);
        this.handleUserPermission(scheduling, user);
        return this.schedulingRepository.update(id, updateSchedulingDto);
    }

    async deleteScheduling(id: number, user: User): Promise<DeleteResult> {
        const scheduling: Scheduling = await this.schedulingRepository.findOne({where: {id}, relations:{ client: true}});
        this.verifySchedulingExistence(scheduling);
        this.handleUserPermission(scheduling, user);
        return this.schedulingRepository.delete(id);
    }

    private verifySchedulingExistence(scheduling: Scheduling) {
        if(!scheduling) {
            throw new HttpException('Agendamento não encontrado', HttpStatus.NOT_FOUND);
        }
    }

    private handleUserPermission(scheduling: Scheduling, user: User) {
        if(scheduling.client.id !== user.id) {
            throw new HttpException('Não é possível acessar esse agendamento', HttpStatus.UNAUTHORIZED);
        }
    }

}
