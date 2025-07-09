/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Patient } from 'src/modules/paitent/entity/paitent.entity'; 

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  appointmentDate: Date;

  @Column({ type: 'varchar', length: 10 })
  appointmentTime: string; // Example: '11:30 AM'

  @Column({ type: 'varchar', length: 100 })
  purpose: string; // Example: 'Consultation', 'Tooth Cleaning', etc.

  @Column({ type: 'varchar', length: 100, nullable: true })
  doctorName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: 'CASCADE',
  })
  patient: Patient;
}
