import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AcademicDegree, StudyForm, PaymentType } from '@prisma/client';

export class StudentProfileResponseDto {
  @ApiProperty({ example: 'profile-uuid' })
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @ApiProperty({ example: 'Олександр Петренко' })
  studentName: string;

  @ApiProperty({ example: 'student.test@student.karazin.ua' })
  email: string;

  @ApiProperty({ example: 'Харківський національний університет імені В. Н. Каразіна' })
  university: string;

  @ApiProperty({ example: 'ННІ комп’ютерних наук та штучного інтелекту' })
  faculty: string;

  @ApiProperty({ example: '122 Комп’ютерні науки' })
  specialty: string;

  @ApiProperty({ example: '122' })
  specialtyCode: string;

  @ApiProperty({ enum: AcademicDegree })
  degree: AcademicDegree;

  @ApiProperty({ example: 'КС-12' })
  group: string;

  @ApiProperty({ example: 2 })
  course: number;

  @ApiProperty({ example: 4 })
  semester: number;

  @ApiProperty({ enum: StudyForm })
  studyForm: StudyForm;

  @ApiProperty({ enum: PaymentType })
  paymentType: PaymentType;

  @ApiPropertyOptional({ example: 'KB № 84920194', nullable: true })
  studentCardNumber?: string | null;

  @ApiPropertyOptional({ example: 'ЗК-24-122-014', nullable: true })
  recordBookNumber?: string | null;

  @ApiProperty({
    example: 88.5,
    description: 'Ukrainian scholarship ranking score (0..100)',
  })
  ratingScore: number;

  @ApiProperty({ example: 240 })
  totalCredits: number;

  @ApiProperty({ example: 90 })
  completedCredits: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
