import { Test, TestingModule } from '@nestjs/testing';
import { CertificatesService } from './certificates.service';
import { PrismaService } from '../prisma/prisma.service';
import { CertificateStatus, CertificateType, CertificateDeliveryType, Role } from '@prisma/client';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

const mockCert = {
  id: 'cert-1',
  userId: 'user-1',
  type: CertificateType.STUDY_CONFIRMATION,
  purpose: 'За місцем вимоги',
  deliveryType: CertificateDeliveryType.DIGITAL_PDF,
  status: CertificateStatus.SIGNED,
  verificationCode: 'KZ-2026-DOC-4920',
  pdfUrl: 'https://example.com/doc.pdf',
  rejectionReason: null,
  processedBy: 'dean-admin',
  processedAt: new Date(2026, 7, 28),
  createdAt: new Date(2026, 7, 27),
  updatedAt: new Date(2026, 7, 28),
  user: {
    name: 'Тестовий Студент',
    studentProfile: {
      specialty: 'Комп’ютерні науки',
      specialtyCode: '122',
      group: 'КС-12',
      university: 'ХНУ імені В. Н. Каразіна',
    },
  },
};

const mockAdminUser = {
  id: 'admin-1',
  name: 'Деканат Адмін',
  email: 'dean@karazin.ua',
  role: Role.DEAN_OFFICE,
};

const mockStudentUser = {
  id: 'student-1',
  name: 'Звичайний Студент',
  email: 'student@karazin.ua',
  role: Role.STUDENT,
};

describe('CertificatesService', () => {
  let service: CertificatesService;
  let mockPrisma: {
    certificateRequest: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
    };
    user: {
      findUnique: jest.Mock;
    };
  };

  beforeEach(async () => {
    mockPrisma = {
      certificateRequest: {
        create: jest.fn().mockResolvedValue(mockCert),
        findMany: jest.fn().mockResolvedValue([mockCert]),
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue(mockCert),
      },
      user: {
        findUnique: jest.fn().mockResolvedValue(mockAdminUser),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificatesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CertificatesService>(CertificatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should order a certificate', async () => {
    const res = await service.orderCertificate('user-1', {
      type: CertificateType.STUDY_CONFIRMATION,
      purpose: 'За місцем вимоги',
    });
    expect(res).toBeDefined();
    expect(mockPrisma.certificateRequest.create).toHaveBeenCalled();
  });

  it('should get my certificates', async () => {
    const res = await service.getMyCertificates('user-1');
    expect(res).toHaveLength(1);
    expect(mockPrisma.certificateRequest.findMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      orderBy: { createdAt: 'desc' },
    });
  });

  it('should get certificate by id for owner', async () => {
    mockPrisma.certificateRequest.findUnique.mockResolvedValueOnce(mockCert);
    const res = await service.getCertificateById('cert-1', 'user-1');
    expect(res.id).toBe('cert-1');
  });

  it('should forbid non-owner access to certificate', async () => {
    mockPrisma.certificateRequest.findUnique.mockResolvedValueOnce(mockCert);
    await expect(service.getCertificateById('cert-1', 'user-other')).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should verify certificate publicly by code and return processing time as issuedAt', async () => {
    mockPrisma.certificateRequest.findUnique.mockResolvedValueOnce(mockCert);
    const res = await service.verifyCertificate('KZ-2026-DOC-4920');
    expect(res.valid).toBe(true);
    expect(res.studentName).toBe('Тестовий Студент');
    expect(res.specialty).toContain('122');
    expect(res.issuedAt).toEqual(mockCert.processedAt);
  });

  it('should throw NotFoundException if verification code does not exist', async () => {
    mockPrisma.certificateRequest.findUnique.mockResolvedValueOnce(null);
    await expect(service.verifyCertificate('INVALID-CODE')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should allow DEAN_OFFICE staff to update certificate status', async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce(mockAdminUser);
    mockPrisma.certificateRequest.findUnique.mockResolvedValueOnce(mockCert);
    const res = await service.updateStatus(
      'cert-1',
      { status: CertificateStatus.READY },
      'admin-1',
    );
    expect(res).toBeDefined();
    expect(mockPrisma.certificateRequest.update).toHaveBeenCalled();
  });

  it('should forbid students from updating certificate status', async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce(mockStudentUser);
    await expect(
      service.updateStatus(
        'cert-1',
        { status: CertificateStatus.READY },
        'student-1',
      ),
    ).rejects.toThrow(ForbiddenException);
  });
});
