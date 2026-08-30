import { Test, TestingModule } from '@nestjs/testing';
import { StudentProfileController } from './student-profile.controller';
import { StudentProfileService } from './student-profile.service';
import { AcademicDegree, PaymentType, StudyForm } from '@prisma/client';

const mockProfileResponse = {
  id: 'prof-1',
  userId: 'user-1',
  studentName: 'Олександр Петренко',
  email: 'student.test@student.karazin.ua',
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
};

const mockService = {
  getProfile: jest.fn().mockResolvedValue(mockProfileResponse),
  updateProfile: jest.fn().mockResolvedValue(mockProfileResponse),
};

describe('StudentProfileController', () => {
  let controller: StudentProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentProfileController],
      providers: [{ provide: StudentProfileService, useValue: mockService }],
    }).compile();

    controller = module.get<StudentProfileController>(StudentProfileController);
  });

  it('should get profile', async () => {
    const res = await controller.getProfile('user-1');
    expect(res.ratingScore).toBe(88.5);
    expect(mockService.getProfile).toHaveBeenCalledWith('user-1');
  });

  it('should update profile', async () => {
    const res = await controller.updateProfile('user-1', { ratingScore: 90.0 });
    expect(res).toBeDefined();
    expect(mockService.updateProfile).toHaveBeenCalledWith('user-1', { ratingScore: 90.0 });
  });
});
