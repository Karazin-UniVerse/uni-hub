import { Test, TestingModule } from '@nestjs/testing';
import { FinancesController } from './finances.controller';
import { FinancesService } from './finances.service';
import { PaymentStatus, PaymentType, ScholarshipStatus, ScholarshipType } from '@prisma/client';

const mockOverview = {
  paymentType: PaymentType.BUDGET,
  isScholarshipAssigned: true,
  monthlyScholarshipAmount: 2000.0,
  debtAmount: 0.0,
  universityIban: 'UA483510050000026001234567890',
  universityEdrpou: '02071205',
};

const mockService = {
  getOverview: jest.fn().mockResolvedValue(mockOverview),
  getScholarships: jest.fn().mockResolvedValue([]),
  getPayments: jest.fn().mockResolvedValue([]),
  createPayment: jest.fn().mockResolvedValue({
    id: 'pay-1',
    amount: 1450.0,
    status: PaymentStatus.PENDING,
  }),
};

describe('FinancesController', () => {
  let controller: FinancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancesController],
      providers: [{ provide: FinancesService, useValue: mockService }],
    }).compile();

    controller = module.get<FinancesController>(FinancesController);
  });

  it('should get overview', async () => {
    const res = await controller.getOverview('user-1');
    expect(res.isScholarshipAssigned).toBe(true);
    expect(mockService.getOverview).toHaveBeenCalledWith('user-1');
  });

  it('should create payment', async () => {
    const res = await controller.createPayment('user-1', {
      amount: 1450.0,
      purpose: 'Оплата за гуртожиток',
    });
    expect(res.amount).toBe(1450.0);
    expect(mockService.createPayment).toHaveBeenCalledWith('user-1', {
      amount: 1450.0,
      purpose: 'Оплата за гуртожиток',
    });
  });
});
