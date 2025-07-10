/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entity/paitent.entity';
import { Repository ,ILike, Between} from 'typeorm';
import { CreatePatientDto } from './dto/create-paitent-dto';
import { UpdatePatientDto } from './dto/update-paitent-dto';
import { Visit } from '../visit/entity/visit.entity';


@Injectable()

export class PaitentService {
    constructor(
        @InjectRepository(Patient)
        private patientRepo :Repository<Patient>,
        @InjectRepository(Visit)
        private visitRepo :Repository<Visit>
    ){}

//create a new patient
    async create(createPatientDto: CreatePatientDto): Promise<Patient> {
        const patient = this.patientRepo.create({
            ...createPatientDto
        });

        return this.patientRepo.save(patient);
    }

//find all patients
//implement paginatoion in this i want to show 20 patients per page
    // async findAll() : Promise<Patient[]> {
    //     const patients = await this.patientRepo.find();
    //     if (!patients || patients.length === 0) {
    //         throw new NotFoundException('No patients found');
    //     }
    //     return patients;
    // }
    async findAll(page: number = 1): Promise<Patient[]> {
    const take = 20;
    const skip = (page - 1) * take;
    const patients = await this.patientRepo.find({ skip, take });
    // if (!patients || patients.length === 0) {
    //     throw new NotFoundException('No patients found');
    // }
    return patients;
}

//delete a paitent record

//also delete all visits of that patient


 async delete(id: number): Promise<string> {
    if (!id) {
        throw new Error('ID must be provided for deletion');
    }
    //find id in the records

    const result=await this.patientRepo.delete(id);
    if (!result.affected) {
        throw new Error(`Patient with id ${id} not found`);
    }
     await this.visitRepo.delete({ patient: { id } });

    if(result)return "deleted successfully"
    
}

//update paitent record

async updateRecord(id: number, updatePaitentDto: UpdatePatientDto): Promise<Patient> {
    await this.patientRepo.update(id, updatePaitentDto);
    const patient = await this.patientRepo.findOne({ where: { id } });
    if (!patient) {
        throw new Error(`Patient with id ${id} not found`);
    }
    return patient;

 
}

//get a single paitent
async findOne(id:number):Promise<Patient> {
    const paitent =await this.patientRepo.findOne({where:{id}})
    return paitent
}

//search patients by name or other fields
async searchPatients(term: string): Promise<Patient[]> {
   const result = await this.patientRepo.find({
        where: [
            { name: ILike(`%${term}%`) },
            // Add more fields if needed, e.g. phoneNumber, guardianName, etc.
        ],
        take: 20, // limit results
    });
    if (result.length === 0) {
        return []; // Return an empty array if no results found
    }
    return result;

}

//get the n paitents visited today
async getVisitedToday(n: number = 10): Promise<Patient[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to start of the next day

    const visits = await this.visitRepo.find({
        where: {
            visitDate: Between(today, tomorrow),
        },
        take: n,
        relations: ['patient'], // Assuming 'patient' is the relation name in Visit entity
    });

    return visits.map(visit => visit.patient);

}

//get the paitents visited in the last n days
async getVisitedLastNDays(days: number = 7): Promise<Patient[]> {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days); // Set to n days ago

    const visits = await this.visitRepo.find({
        where: {
            visitDate: Between(startDate, today),
        },
        relations: ['patient'], // Assuming 'patient' is the relation name in Visit entity
    });

    return visits.map(visit => visit.patient);

}

//want to get the number of patients visited for each month of the current year
async getMonthlyVisitsCount(): Promise<{ month: string; count: number }[]> {
    const currentYear = new Date().getFullYear();
    const visits = await this.visitRepo.createQueryBuilder('visit')
        .select("TO_CHAR(visit.visitDate, 'Month')", "month")
        .addSelect('COUNT(*)', 'count')
        .where("EXTRACT(YEAR FROM visit.visitDate) = :year", { year: currentYear })
        .groupBy('month')
        .orderBy('month', 'ASC')
        .getRawMany();

    return visits.map(visit => ({
        month: visit.month.trim(), // trim to remove extra spaces
        count: parseInt(visit.count, 10),
    }));   
}


}