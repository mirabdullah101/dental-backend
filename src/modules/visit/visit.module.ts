/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './entity/visit.entity';
import { Patient } from '../paitent/entity/paitent.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Visit,Patient])],
    providers: [VisitService],
    controllers: [VisitController],
    exports: [VisitService],
})
export class VisitModule {}
