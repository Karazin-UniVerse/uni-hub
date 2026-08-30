import { Test, TestingModule } from '@nestjs/testing';
import { FinancesService } from './finances.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStatus, PaymentType, ScholarshipStatus, ScholarshipType } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

const mockProfile = {
  id: 'prof-1',
  userId: 'user-1',
  paymentType: PaymentType.BUDGET,
  ratingScore: 91.5,
};

const mockScholarship = {
  id: 'sch-1',
  userId: 'user-1',
  month: 9,
  year: 2026,
  type: ScholarshipType.ACADEMIC_STANDARD,
  amount: 2000.0,
  status: ScholarshipStatus.PAID,
  bankCardMask: '•••• 8492',
  paidAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPayment = {
  id: 'pay-1',
  userId: 'user-1',
  amount: 1450.0,
  purpose: 'Оплата за гуртожиток',
  status: PaymentStatus.PENDING,
  recipientName: 'Харківський національний університет імені В. Н. Каразіна',
  recipientIban: 'UA483510050000026001234567890',
  edrpou: '02071205',
  receiptUrl: null,
  paidAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('FinancesService', () => {
  let service: FinancesService;
  let mockPrisma: {
    studentProfile: { findUnique: jest.Mock };
    scholarshipRecord: { findMany: jest.Mock };
    paymentTransaction: { findMany: jest.Mock; create: jest.Mock };
  };

  beforeEach(async () => {
    mockPrisma = {
      studentProfile: {
        findUnique: jest.fn().mockResolvedValue(mockProfile),
      },
      scholarshipRecord: {
        findMany: jest.fn().mockResolvedValue([mockScholarship]),
      },
      paymentTransaction: {
        findMany: jest.fn().mockResolvedValue([mockPayment]),
        create: jest.fn().mockResolvedValue(mockPayment),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinancesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<FinancesService>(FinancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get overview with scholarship eligibility', async () => {
    const res = await service.getOverview('user-1');
    expect(res.isScholarshipAssigned).toBe(true);
    expect(res.monthlyScholarshipAmount).toBe(2000.0);
    expect(res.universityEdrpou).toBe('02071205');
  });

  it('should throw NotFoundException if profile is missing in getOverview', async () => {
    mockPrisma.studentProfile.findUnique.mockResolvedValue(null);
    await expect(service.getOverview('user-no-profile')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should get scholarships history', async () => {
    const res = await service.getScholarships('user-1');
    expect(res).toHaveLength(1);
    expect(res[0].amount).toBe(2000.0);
  });

  it('should create payment', async () => {
    const res = await service.createPayment('user-1', {
      amount: 1450.0,
      purpose: 'Оплата за гуртожиток',
    });
    expect(res.amount).toBe(1450.0);
    expect(mockPrisma.paymentTransaction.create).toHaveBeenCalled();
  });
});
