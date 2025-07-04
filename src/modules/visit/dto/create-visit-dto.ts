/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Patient } from 'src/modules/paitent/entity/paitent.entity' // Adjust the import path as necessary

@Entity('visits')
export class CreateVisitDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  visitId: number; // auto-incremental per patient (set in service)

  @CreateDateColumn({ type: 'timestamp' }) // auto-generated on insert
  visitDate: Date;

  @Column({ type: 'varchar', length: 20 }) // formatted string like "11:08 AM"
  visitTime: string;

  @Column({ type: 'varchar', length: 255 })
  serviceRendered: string;

  @Column({ type: 'numeric', default: 0 })
  totalBill: number;

  @Column({ type: 'numeric', default: 0 })
  creditAmount: number;

  @Column({ type: 'numeric', default: 0 })
  balanceAmount: number;

  @ManyToOne(() => Patient, (patient) => patient.visits, {
    onDelete: 'CASCADE',
  })
  patient: Patient;
}
