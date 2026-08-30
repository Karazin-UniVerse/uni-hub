import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { StudentProfileResponseDto } from './dto/student-profile-response.dto';
import { StudentProfile, User } from '@prisma/client';

@Injectable()
export class StudentProfileService {
  constructor(private readonly prisma: PrismaService) {}

  private toResponseDto(
    profile: StudentProfile,
    user: User,
  ): StudentProfileResponseDto {
    return {
      id: profile.id,
      userId: profile.userId,
      studentName: user.name || 'Студент ХНУ',
      email: user.email,
      university: profile.university,
      faculty: profile.faculty,
      specialty: profile.specialty,
      specialtyCode: profile.specialtyCode,
      degree: profile.degree,
      group: profile.group,
      course: profile.course,
      semester: profile.semester,
      studyForm: profile.studyForm,
      paymentType: profile.paymentType,
      studentCardNumber: profile.studentCardNumber,
      recordBookNumber: profile.recordBookNumber,
      ratingScore: profile.ratingScore,
      totalCredits: profile.totalCredits,
      completedCredits: profile.completedCredits,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  async getProfile(userId: string): Promise<StudentProfileResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = await this.prisma.studentProfile.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        university: 'Харківський національний університет імені В. Н. Каразіна',
        faculty: 'ННІ комп’ютерних наук та штучного інтелекту',
        specialty: '122 Комп’ютерні науки',
        specialtyCode: '122',
        group: 'КС-12',
        course: 2,
        semester: 4,
        ratingScore: 88.5,
        totalCredits: 240,
        completedCredits: 90,
      },
    });

    return this.toResponseDto(profile, user);
  }

  async updateProfile(
    userId: string,
    dto: UpdateStudentProfileDto,
  ): Promise<StudentProfileResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { studentProfile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existing = user.studentProfile;
    const effectiveTotal = dto.totalCredits ?? existing?.totalCredits ?? 240;
    const effectiveCompleted =
      dto.completedCredits ?? existing?.completedCredits ?? 0;

    if (effectiveCompleted > effectiveTotal) {
      throw new BadRequestException('completedCredits cannot exceed totalCredits');
    }

    const updatedProfile = await this.prisma.studentProfile.upsert({
      where: { userId },
      create: {
        userId,
        ...dto,
      },
      update: {
        ...dto,
      },
    });

    return this.toResponseDto(updatedProfile, user);
  }
}
