import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateStatusDto } from './dto/update-certificate-status.dto';
import {
  CertificateResponseDto,
  CertificateVerificationResponseDto,
} from './dto/certificate-response.dto';
import { CertificateStatus } from '@prisma/client';

@Injectable()
export class CertificatesService {
  constructor(private readonly prisma: PrismaService) {}

  async orderCertificate(
    userId: string,
    dto: CreateCertificateDto,
  ): Promise<CertificateResponseDto> {
    const verificationCode = `KZ-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const cert = await this.prisma.certificateRequest.create({
      data: {
        userId,
        type: dto.type,
        purpose: dto.purpose,
        deliveryType: dto.deliveryType,
        status: CertificateStatus.PENDING,
        verificationCode,
      },
    });

    return cert;
  }

  async getMyCertificates(userId: string): Promise<CertificateResponseDto[]> {
    return this.prisma.certificateRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCertificateById(
    id: string,
    userId: string,
  ): Promise<CertificateResponseDto> {
    const cert = await this.prisma.certificateRequest.findUnique({
      where: { id },
    });

    if (!cert) {
      throw new NotFoundException('Certificate request not found');
    }

    if (cert.userId !== userId) {
      throw new ForbiddenException('Access denied to this certificate');
    }

    return cert;
  }

  async verifyCertificate(
    code: string,
  ): Promise<CertificateVerificationResponseDto> {
    const cert = await this.prisma.certificateRequest.findUnique({
      where: { verificationCode: code },
      include: {
        user: {
          include: {
            studentProfile: true,
          },
        },
      },
    });

    if (!cert) {
      throw new NotFoundException('Certificate with this verification code was not found');
    }

    const student = cert.user.studentProfile;

    return {
      valid: cert.status === CertificateStatus.SIGNED || cert.status === CertificateStatus.READY,
      verificationCode: cert.verificationCode,
      type: cert.type,
      studentName: cert.user.name || 'Студент ХНУ',
      specialty: student ? `${student.specialtyCode} ${student.specialty}` : '122 Комп’ютерні науки',
      group: student?.group || 'КС-12',
      university: student?.university || 'Харківський національний університет імені В. Н. Каразіна',
      status: cert.status,
      issuedAt: cert.createdAt,
      digitalSignature:
        cert.status === CertificateStatus.SIGNED || cert.status === CertificateStatus.READY
          ? 'ЕЦП Сертифікат № 492019-ХНУ (ВАЛІДНИЙ)'
          : 'Очікує підписання ЕЦП',
    };
  }

  async updateStatus(
    id: string,
    dto: UpdateCertificateStatusDto,
    processedBy?: string,
  ): Promise<CertificateResponseDto> {
    const exists = await this.prisma.certificateRequest.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Certificate request not found');
    }

    return this.prisma.certificateRequest.update({
      where: { id },
      data: {
        status: dto.status,
        rejectionReason: dto.rejectionReason,
        pdfUrl: dto.pdfUrl,
        processedBy,
        processedAt: new Date(),
      },
    });
  }
}
