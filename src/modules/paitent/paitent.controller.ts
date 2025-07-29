/* eslint-disable prettier/prettier */
import { Controller,Get ,Post,Patch ,Delete, Body, Param  ,Query} from '@nestjs/common';
import { PaitentService } from './paitent.service';
import { CreatePatientDto } from './dto/create-paitent-dto';
import {Patient } from './entity/paitent.entity';
import { UpdatePatientDto } from './dto/update-paitent-dto';

@Controller('patient')
export class PaitentController {
constructor(private readonly paitentService: PaitentService) {}

@Post('/add')
async create(@Body() createPaitentDto :CreatePatientDto):Promise<Patient>{
    return this.paitentService.create(createPaitentDto)
}

//get all
@Get('/all')
async findAll(
  @Query('page') page: number = 1,
  @Query('search') search: string = ''
) {
  return this.paitentService.findAll(Number(page), search);
}


@Delete('/delete/:id')
async delete(@Param('id') id: number): Promise<string> {
    return this.paitentService.delete(id);
}

@Patch('/update/:id')
async updatePatientRecord(@Param('id') id:number , @Body() updatePaitentDto :UpdatePatientDto ):Promise<Patient>{
    return this.paitentService.updateRecord(id,updatePaitentDto)

}

@Get('/find/:id')
async findOne(@Param('id') id: number): Promise<Patient> {
    return this.paitentService.findOne(id);
}

@Get('/search')
async search(@Query('q') q: string): Promise<Patient[]> {
    return this.paitentService.searchPatients(q);
}

//i want to get the n paitents visited for the day
@Get('/visited-today')
async getVisitedToday(@Query('n') n: number = 10): Promise<Patient[]> {
    return this.paitentService.getVisitedToday(Number(n));

}

//get the paitents visited in the last n days
@Get('/visited-last-n-days')
async getVisitedLastNDays(@Query('days') days: number = 7): Promise<Patient[]> {
    return this.paitentService.getVisitedLastNDays(Number(days));   
}

//get monthly visits count for each month
//this will return an array of objects with month and count
@Get('/monthly-visits')
async getMonthlyVisitsCount(): Promise<{ month: string; count: number }[]> {
    return this.paitentService.getMonthlyVisitsCount();
}

//total patient count for the month
@Get('/total-count')
async getTotalPatientCount(): Promise<number> {
    return this.paitentService.getTotalPatientCount();
}





}