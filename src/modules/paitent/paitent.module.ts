/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaitentService } from './paitent.service';
import { PaitentController } from './paitent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entity/paitent.entity';
import { Visit } from '../visit/entity/visit.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Patient,Visit])],
  providers: [PaitentService],
  controllers: [PaitentController],
  exports:[PaitentService]
})
export class PaitentModule {}
