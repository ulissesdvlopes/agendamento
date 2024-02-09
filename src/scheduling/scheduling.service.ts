import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { Scheduling, ServiceType } from './scheduling.entity';
import { CreateSchedulingDto } from './dtos/create-scheduling.dto';
import { UpdateSchedulingDto } from './dtos/update-scheduling.dto';
import { User } from 'src/users/entities/user.entity';
import SchedulingFilters from './schedulingFilters.interface';

@Injectable()
export class SchedulingService {

    constructor(
        @InjectRepository(Scheduling)
        private readonly schedulingRepository: Repository<Scheduling>,
    ) {}

    getAllSchedulings(user: User, vehicle: string, serviceType: string): Promise<Scheduling[]> {
        let where: SchedulingFilters = {client: user}
        if(vehicle) {
            where = {...where, vehicle: ILike(`%${vehicle}%`)}
        }
        if(serviceType) {
                        
            const typeOfService: ServiceType = ServiceType[serviceType.toUpperCase() as keyof typeof ServiceType];
            if(!typeOfService) {
                throw new HttpException('Valor inválido para o tipo de serviço', HttpStatus.BAD_REQUEST)
            }
            
            where = {...where, serviceType: typeOfService}
        }
        return this.schedulingRepository.find({
            where
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
        scheduling.serviceType = createschedulingDto.serviceType;
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
