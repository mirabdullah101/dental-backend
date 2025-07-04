/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from 'src/modules/paitent/entity/paitent.entity';

@Entity('visits')
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  visitId: number;

  // Automatically set to current timestamp
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  visitDate: Date;

  // Human-readable time (e.g., "11:08 AM") — set manually in service
  @Column({ type: 'varchar', length: 20 })
  visitTime: string;

  @Column({ type: 'varchar', length: 100 })
  serviceRendered: string;

  @Column({ type: 'int', default: 0 })
  totalBill: number;

  @Column({ type: 'int', default: 0 })
  creditAmount: number;

  @Column({ type: 'int', default: 0 })
  balanceAmount: number;

  @ManyToOne(() => Patient, (patient) => patient.visits, {
    onDelete: 'CASCADE',
  })
  patient: Patient;
}
