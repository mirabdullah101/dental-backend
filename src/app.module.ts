/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { PaitentModule } from './modules/paitent/paitent.module';
import { VisitModule } from './modules/visit/visit.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [DatabaseModule,PaitentModule,VisitModule,AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
