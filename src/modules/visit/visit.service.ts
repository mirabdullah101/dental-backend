/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visit } from './entity/visit.entity';
import { Repository } from 'typeorm';
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
//   if (!patient) throw new NotFoundException('Patient not found');

  const now = new Date();

  const visit = this.visitRepo.create({
    ...dto,
    visitId: (patient.visits?.length || 0) + 1,
    visitDate: now,
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


}

