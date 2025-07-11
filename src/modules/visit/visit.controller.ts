/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit-dto';
import { VisitService } from './visit.service';
import { Visit } from './entity/visit.entity';
import { UpdateVisitDto } from './dto/update-visit-dto.ts';

@Controller('visit')
export class VisitController {
    constructor(private readonly visitService: VisitService) {}

    // get all visits
    @Get('/all')
    async getAllVisits(): Promise<Visit[]> {
        return this.visitService.getAllVisits();    
    }

    // get visits for a specific date
    @Get('/date/:date')
    async getVisitsByDate(@Param('date') date: string): Promise<Visit[]> {
        return this.visitService.getVisitsByDate(date);
    }

    // visits in the last n days
    @Get('/last-n-days')
    async getVisitsLastNDays(@Query('days') days: number = 7): Promise<Visit[]> {
        return this.visitService.getVisitsLastNDays(Number(days));
    }

    // get last 5 visits
    @Get('/last-5')
    async getLast5Visits(): Promise<Visit[]> {
        return this.visitService.getLast5Visits();
    }

    @Post('/add/:patientId')
    async createVisit(
        @Param('patientId') patientId: number,
        @Body() createVisitDto: CreateVisitDto
    ): Promise<Visit> {
        return this.visitService.createVisit(patientId, createVisitDto);   
    }

    // get visits of a single patient
    @Get(':patientId')
    async getVisits(@Param('patientId') patientId: number): Promise<Visit[]> {
        return this.visitService.getVisits(patientId);
    }

    // update visit
    @Patch(':visitId/update')
    async updateVisit(
        @Param('visitId') visitId: number,
        @Body() updateVisitDto: UpdateVisitDto
    ): Promise<Visit> {
        return this.visitService.updateVisit(visitId, updateVisitDto);
    }

    // delete visit
    @Patch(':visitId/delete')
    async deleteVisit(@Param('visitId') visitId: number): Promise<string> {
        return this.visitService.deleteVisit(visitId);
    }
}