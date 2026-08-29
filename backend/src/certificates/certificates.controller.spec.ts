import { Test, TestingModule } from '@nestjs/testing';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { CertificateType, CertificateStatus, CertificateDeliveryType } from '@prisma/client';

const mockCertResponse = {
  id: 'cert-1',
  userId: 'user-1',
  type: CertificateType.STUDY_CONFIRMATION,
  purpose: 'За місцем вимоги',
  deliveryType: CertificateDeliveryType.DIGITAL_PDF,
  status: CertificateStatus.SIGNED,
  verificationCode: 'KZ-2026-DOC-4920',
  pdfUrl: null,
  rejectionReason: null,
  processedBy: null,
  processedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockService = {
  orderCertificate: jest.fn().mockResolvedValue(mockCertResponse),
  getMyCertificates: jest.fn().mockResolvedValue([mockCertResponse]),
  getCertificateById: jest.fn().mockResolvedValue(mockCertResponse),
  verifyCertificate: jest.fn().mockResolvedValue({
    valid: true,
    verificationCode: 'KZ-2026-DOC-4920',
    type: CertificateType.STUDY_CONFIRMATION,
    studentName: 'Тестовий Студент',
    specialty: '122 Комп’ютерні науки',
    group: 'КС-12',
    university: 'ХНУ імені В. Н. Каразіна',
    status: CertificateStatus.SIGNED,
    issuedAt: new Date(),
    digitalSignature: 'ЕЦП Сертифікат № 492019-ХНУ (ВАЛІДНИЙ)',
  }),
  updateStatus: jest.fn().mockResolvedValue(mockCertResponse),
};

describe('CertificatesController', () => {
  let controller: CertificatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificatesController],
      providers: [{ provide: CertificatesService, useValue: mockService }],
    }).compile();

    controller = module.get<CertificatesController>(CertificatesController);
  });

  it('should order a certificate', async () => {
    const res = await controller.orderCertificate('user-1', {
      type: CertificateType.STUDY_CONFIRMATION,
      purpose: 'За місцем вимоги',
    });
    expect(res).toBeDefined();
    expect(mockService.orderCertificate).toHaveBeenCalledWith('user-1', {
      type: CertificateType.STUDY_CONFIRMATION,
      purpose: 'За місцем вимоги',
    });
  });

  it('should get my certificates', async () => {
    const res = await controller.getMyCertificates('user-1');
    expect(res).toHaveLength(1);
    expect(mockService.getMyCertificates).toHaveBeenCalledWith('user-1');
  });

  it('should verify certificate by code', async () => {
    const res = await controller.verifyCertificate('KZ-2026-DOC-4920');
    expect(res.valid).toBe(true);
    expect(mockService.verifyCertificate).toHaveBeenCalledWith('KZ-2026-DOC-4920');
  });
});
