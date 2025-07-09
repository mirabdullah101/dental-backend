/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../paitent/entity/paitent.entity';
import { Appointment } from './entity/appointment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Patient,Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
