import { User } from "src/users/entities/user.entity";
import { FindOperator, FindOptionsWhere } from "typeorm";
import { Scheduling, ServiceType } from "./scheduling.entity";

export default interface SchedulingFilters extends FindOptionsWhere<Scheduling> {
    client: User;
    vehicle?: FindOperator<string>;
    serviceType?: ServiceType;
}
