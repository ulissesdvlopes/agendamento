import {
    BaseEntity,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';

export enum ServiceType {
    INSPECTION = "inspection",
    ALIGNMENT = "alignment",
}

@Entity()
export class Scheduling extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    // TODO create entity vehicle
    @Column({ nullable: false, type: 'varchar', length: 200 })
    vehicle: string;

    @Column({ type: 'timestamptz', nullable: false })
    date: Date;

    @Column({
        type: "enum",
        enum: ServiceType,
        default: ServiceType.INSPECTION
    })
    serviceType: ServiceType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
