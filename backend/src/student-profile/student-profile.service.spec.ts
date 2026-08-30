import { Test, TestingModule } from '@nestjs/testing';
import { StudentProfileService } from './student-profile.service';
import { PrismaService } from '../prisma/prisma.service';
import { AcademicDegree, PaymentType, StudyForm } from '@prisma/client';

const mockUser = {
  id: 'user-1',
  name: 'Олександр Петренко',
  email: 'student.test@student.karazin.ua',
  studentProfile: {
    id: 'prof-1',
    userId: 'user-1',
    university: 'ХНУ імені В. Н. Каразіна',
    faculty: 'ННІ комп’ютерних наук та штучного інтелекту',
    specialty: '122 Комп’ютерні науки',
    specialtyCode: '122',
    degree: AcademicDegree.BACHELOR,
    group: 'КС-12',
    course: 2,
    semester: 4,
    studyForm: StudyForm.FULL_TIME,
    paymentType: PaymentType.BUDGET,
    studentCardNumber: 'KB № 84920194',
    recordBookNumber: 'ЗК-24-122-014',
    ratingScore: 88.5,
    totalCredits: 240,
    completedCredits: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const mockPrisma = {
  user: {
    findUnique: jest.fn().mockResolvedValue(mockUser),
  },
  studentProfile: {
    create: jest.fn().mockResolvedValue(mockUser.studentProfile),
    upsert: jest.fn().mockResolvedValue(mockUser.studentProfile),
  },
};

describe('StudentProfileService', () => {
  let service: StudentProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentProfileService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<StudentProfileService>(StudentProfileService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return student profile with ratingScore', async () => {
    const res = await service.getProfile('user-1');
    expect(res).toBeDefined();
    expect(res.ratingScore).toBe(88.5);
    expect(res.group).toBe('КС-12');
  });

  it('should update student profile', async () => {
    const res = await service.updateProfile('user-1', { ratingScore: 91.0 });
    expect(res).toBeDefined();
    expect(mockPrisma.studentProfile.upsert).toHaveBeenCalled();
  });

  it('should reject update if completedCredits exceeds totalCredits', async () => {
    await expect(
      service.updateProfile('user-1', {
        completedCredits: 300,
        totalCredits: 240,
      }),
    ).rejects.toThrow();
  });
});
