/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
import { Appointment } from './entity/appointment.entity';
import { AppointmentService } from './appointment.service';
import { UpdateAppointmentDto } from './dto/update-appointment-dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('/patient/:patientId')
  async addAppointment(
    @Param('patientId') patientId: number,
    @Body() createAppointDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentService.addAppointment(patientId, createAppointDto);
  }

  //update appointment
  @Patch('patient/edit/:appointmentId')
  async editAppointment(
    @Param('appointmentId') appointmentId:number ,@Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentService.updateAppointment(
      appointmentId,
      updateAppointmentDto,
    );
  }

  //delete appointment 
  @Delete('patient/delete/:appointmentId')
  async deleteAppointment(@Param('appointmentId') appointmentId:number) : Promise<string> {
    return this.appointmentService.deleteAppointment(appointmentId)
  }


  //get appointments for the day
  @Get('today')
  async getTodayAppointments(): Promise<Appointment[]> {
    return this.appointmentService.getTodayAppointments();
  }

  //get appointments count for the day
  @Get('today/count') 
  async getTodayCount():Promise<number>{
    return this.appointmentService.getTodayCount()
  }

  //get all appointments
  @Get('all')
  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentService.getAllAppointments();
  }
  



}
