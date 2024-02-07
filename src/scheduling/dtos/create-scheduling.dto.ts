import { ServiceType } from "../scheduling.entity";

export class CreateSchedulingDto {
    vehicle: string;
    date: Date;
    serviceType: ServiceType;
  }