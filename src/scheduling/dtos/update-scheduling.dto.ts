import { IsNotEmpty, IsDate, MinLength, MinDate, IsOptional, IsEnum } from "class-validator";
import { ServiceType } from "../scheduling.entity";
import { Type, Exclude } from "class-transformer";

// TODO refact to replace similar code to CreateSchedulingDto
export class UpdateSchedulingDto {
    // TODO avoid changing id field
    id: number;

    @IsNotEmpty({ message: 'Veículo não pode ser vazio' })
    @MinLength(3, { message: 'Campo veículo deve ter no mínimo 3 caracteres'})
    vehicle: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @MinDate(new Date(), { message: 'Data escolhida deve ser maior do que a data atual'})
    date: Date;

    @IsEnum(ServiceType)
    serviceType: ServiceType;
  }