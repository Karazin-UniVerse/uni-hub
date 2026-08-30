import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { AcademicDegree, StudyForm, PaymentType } from '@prisma/client';

export class UpdateStudentProfileDto {
  @ApiPropertyOptional({ example: 'V. N. Karazin Kharkiv National University' })
  @IsOptional()
  @IsString()
  university?: string;

  @ApiPropertyOptional({ example: 'Institute of Computer Science and AI' })
  @IsOptional()
  @IsString()
  faculty?: string;

  @ApiPropertyOptional({ example: 'Computer Science' })
  @IsOptional()
  @IsString()
  specialty?: string;

  @ApiPropertyOptional({ example: '122' })
  @IsOptional()
  @IsString()
  specialtyCode?: string;

  @ApiPropertyOptional({ enum: AcademicDegree })
  @IsOptional()
  @IsEnum(AcademicDegree)
  degree?: AcademicDegree;

  @ApiPropertyOptional({ example: 'CS-12' })
  @IsOptional()
  @IsString()
  group?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(6)
  course?: number;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  semester?: number;

  @ApiPropertyOptional({ enum: StudyForm })
  @IsOptional()
  @IsEnum(StudyForm)
  studyForm?: StudyForm;

  @ApiPropertyOptional({ enum: PaymentType })
  @IsOptional()
  @IsEnum(PaymentType)
  paymentType?: PaymentType;

  @ApiPropertyOptional({ example: 'KB № 84920194' })
  @IsOptional()
  @IsString()
  studentCardNumber?: string;

  @ApiPropertyOptional({ example: 'ЗК-24-122-014' })
  @IsOptional()
  @IsString()
  recordBookNumber?: string;

  @ApiPropertyOptional({
    example: 93.4,
    description: 'Ukrainian scholarship ranking score (0..100)',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  ratingScore?: number;

  @ApiPropertyOptional({ example: 240 })
  @IsOptional()
  @IsInt()
  @Min(0)
  totalCredits?: number;

  @ApiPropertyOptional({ example: 90 })
  @IsOptional()
  @IsInt()
  @Min(0)
  completedCredits?: number;
}
