import { IsNotEmpty, IsDate, MinLength, MinDate, IsEnum } from "class-validator";
import { ServiceType } from "../scheduling.entity";
import { Type } from "class-transformer";
import { User } from "src/users/entities/user.entity";

export class CreateSchedulingDto {

    @IsNotEmpty({ message: 'Veículo não pode ser vazio' })
    @MinLength(3, { message: 'Campo veículo deve ter no mínimo 3 caracteres'})
    vehicle: string;

    // TODO check if date is available
    @Type(() => Date)
    @IsDate()
    @MinDate(new Date(), { message: 'Data escolhida deve ser maior do que a data atual'})
    date: Date;

    @IsEnum(ServiceType)
    serviceType: ServiceType;
  }