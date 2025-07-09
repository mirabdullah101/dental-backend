/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsOptional,
 
} from 'class-validator';


export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  guardianName?: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  Occupation?: string;

  @IsString()
  doctorName: string;

  @IsOptional()
  @IsString()
  referredBy?: string;

  

//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreateVisitDto)
//   visits?: CreateVisitDto[];
}
