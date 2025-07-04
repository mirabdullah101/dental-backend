/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Visit } from 'src/modules/visit/entity/visit.entity'; 

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'date', nullable: false })
  dateOfBirth: Date;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  guardianName: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  phoneNumber: string;

  @Column({ type: 'text', nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  occupation: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  doctorName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  referredBy: string;

  @CreateDateColumn({ type: 'timestamp' }) // auto-generated timestamp
  registrationDate: Date;


  @OneToMany(() => Visit, (visit) => visit.patient, { cascade: true })
  visits: Visit[];
}
// Note: The `visits` field is optional and can be used to store related visit records.