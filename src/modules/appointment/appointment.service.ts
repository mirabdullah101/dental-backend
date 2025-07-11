/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entity/appointment.entity';
import { Between, Repository,Raw } from 'typeorm';
import { Patient } from '../paitent/entity/paitent.entity';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
import { UpdateAppointmentDto } from './dto/update-appointment-dto';

@Injectable()
export class AppointmentService {
    constructor(@InjectRepository(Appointment)
    private appointmentRepo : Repository<Appointment>,
    @InjectRepository(Patient)
    private patientRepo :Repository<Patient>
){}

//add appointment
async addAppointment(patientId:number,dto:CreateAppointmentDto) : Promise<Appointment>{
    const patient = await this.patientRepo.findOne({
        where: { id: patientId },
        relations: ['appointments'],
      });
    if (!patient) {
        throw new Error('Patient not found');
    }

    const appointment = this.appointmentRepo.create({
      appointmentDate: new Date(dto.appointmentDate),
      appointmentTime: dto.appointmentTime,
      purpose: dto.purpose,
      doctorName: dto.doctorName,
      notes: dto.notes,
      patient,
    });

    return this.appointmentRepo.save(appointment);

}

async getTodayAppointments(): Promise<Appointment[]> {
  const today = new Date();

  // Format to YYYY-MM-DD
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}-${mm}-${dd}`; // e.g., "2025-07-21"

  return this.appointmentRepo.find({
    where: {
      appointmentDate: Raw((alias) => `${alias} = DATE(:date)`, { date: formattedDate }),
    },
    relations: ['patient'],
    order: { appointmentTime: 'ASC' },
  });
}

  //update appointment
  async updateAppointment(appointmentId:number,updateAppointmentDto:UpdateAppointmentDto) :Promise<Appointment> {
    const patient = this.appointmentRepo.findOne({where:{id:appointmentId}})
    if(!patient) throw new Error ("appointment not found")
     await this.appointmentRepo.update(appointmentId,updateAppointmentDto)
    return this.appointmentRepo.findOne({where:{id:appointmentId}})

  }

  //delete appointment
  async deleteAppointment(appointmentId:number):Promise<string>{
    const appointment = await this.appointmentRepo.delete(appointmentId)
    if(!appointment) throw new  Error("appointment  not found")

      return `appointment Removed successfully`

  }

  //get number of appoints for the day
  async getTodayCount(): Promise<number> {
  const today = new Date();
  // Set time to midnight to ensure it's only the date part
  today.setHours(0, 0, 0, 0);

  const appointments= await this.appointmentRepo.find({
    where: { appointmentDate: today },
    order: { appointmentTime: 'ASC' },
  });
  return appointments.length
}

//upcoming appointments count
// async getUpcomingAppointments(): Promise<number> {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Set to start of the day

//   const appointments= await this.appointmentRepo.find({
//     where: {
//       appointmentDate: Raw((alias) => `${alias} > DATE(:date)`, { date: today }),
//     },
//     relations: ['patient'],
//     order: { appointmentDate: 'ASC', appointmentTime: 'ASC' },
//   });
//   return appointments.length;
// }

  
}
