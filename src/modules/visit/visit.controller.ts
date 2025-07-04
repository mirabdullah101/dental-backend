/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit-dto';
import { VisitService } from './visit.service';
import { Visit } from './entity/visit.entity';
import { UpdateVisitDto } from './dto/update-visit-dto.ts';


@Controller('visit')
export class VisitController {
    constructor(private readonly visitService: VisitService) {}


 @Post('/add/:patientId')
 async createVisit(@Param('patientId') patientId: number, @Body() createVisitDto: CreateVisitDto): Promise<Visit> {
     return this.visitService.createVisit(patientId,createVisitDto)   
}
//get visits of a single patient
@Get(':patientId')
async getVisits(@Param('patientId') patientId:number) : Promise<Visit[]> {
    return this.visitService.getVisits(patientId);
}

//update visit
@Patch(':visitId/update')
async updateVisit(@Param('visitId') visitId: number, @Body() updateVisitDto: UpdateVisitDto): Promise<Visit> {
    return this.visitService.updateVisit(visitId, updateVisitDto);

}
}




