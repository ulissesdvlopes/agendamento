import { ServiceType } from "../scheduling.entity";

export class UpdateSchedulingDto {
    vehicle: string;
    date: Date;
    serviceType: ServiceType;
  }