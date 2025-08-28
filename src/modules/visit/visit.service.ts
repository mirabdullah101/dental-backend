/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visit } from './entity/visit.entity';
import { Between, Repository } from 'typeorm';
import { format } from 'date-fns';
import { CreateVisitDto } from './dto/create-visit-dto';
import { Patient } from '../paitent/entity/paitent.entity';
import { UpdateVisitDto } from './dto/update-visit-dto.ts';




@Injectable()
export class VisitService {
    constructor(
        @InjectRepository(Visit)
        private visitRepo : Repository<Visit>,

         @InjectRepository(Patient)
                private patientRepo :Repository<Patient>
    ){}

    //add
    async createVisit(patientId :number ,dto: CreateVisitDto): Promise<Visit> {
  const patient = await this.patientRepo.findOne({
    where: { id: patientId },
    relations: ['visits'],
  });
  if (!patient) throw new NotFoundException('Patient not found');

  const now = new Date();
  const dateOnly = now.toISOString().slice(0, 10); // "YYYY-MM-DD"

  const visit = this.visitRepo.create({
    ...dto,
    visitId: (patient.visits?.length || 0) + 1,
    visitDate: dateOnly,
    visitTime: format(now, 'hh:mm a'),
    patient,
  });

  return this.visitRepo.save(visit);
}

//get visits for a paitent
async getVisits(patientId: number): Promise<Visit[]> {
  const visits = await this.visitRepo.find({
    where: { patient: { id: patientId } },
    order: { visitDate: 'ASC' },
    // relations: ['patient'],      
  });
  return visits;
}


  //updtate visit
  async updateVisit(visitId: number, updateVisitDto: UpdateVisitDto): Promise<Visit> {
    const visit = await this.visitRepo.findOne({ where: { id: visitId } });
    if (!visit) {
      throw new Error(`Visit with id ${visitId} not found`);
    }
    await this.visitRepo.update(visitId, updateVisitDto);
    return this.visitRepo.findOne({ where: { id: visitId } });
}


  //delete visit
  async deleteVisit(visitId: number): Promise<string> {
    const result = await this.visitRepo.delete(visitId);
    if (result.affected === 0) {
      throw new Error(`Visit with id ${visitId} not found`);
    }
    return `Visit with id ${visitId} deleted successfully`;
  }

  //get all visits
  async getAllVisits(): Promise<Visit[]> {
    return this.visitRepo.find({ order: { visitDate: 'DESC' } });
  }

  //get visits for a specific date
  async getVisitsByDate(date: string): Promise<Visit[]> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format');
    }

    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    return this.visitRepo.find({
      where: {
        visitDate: Between(startOfDay, endOfDay),
      },
      order: { visitDate: 'ASC' },
    });


  }

  //async get visits for the last 7 days
  async getVisitsLastNDays(days: number = 7): Promise<Visit[]> {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days); // Set to n days ago

    return this.visitRepo.find({
      where: {
        visitDate: Between(startDate, today),
      },
      relations: ['patient'], // Assuming 'patient' is the relation name in Visit entity
      order: { visitDate: 'DESC' },
    });
  }


  //get last 5 visists
  async getLast5Visits(): Promise<Visit[]> {
    return this.visitRepo.find({
      order: { visitDate: 'DESC' },
      take: 5,
      relations: ['patient'], // Assuming 'patient' is the relation name in Visit entity
    });
  }


}

