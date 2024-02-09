import { Exclude } from 'class-transformer';
import { Scheduling } from 'src/scheduling/scheduling.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id?: number;
    
    @Column({ unique: true })
    public email: string;
    
    @Column()
    public name: string;
    
    @Column()
    @Exclude()
    public password: string;

    @OneToMany(
        () => Scheduling,
        (scheduling) => scheduling.client
    )
    schedulings: Scheduling[];
}
