import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateStatusDto } from './dto/update-certificate-status.dto';
import {
  CertificateResponseDto,
  CertificateVerificationResponseDto,
} from './dto/certificate-response.dto';
import { CertificateStatus, Role } from '@prisma/client';

@Injectable()
export class CertificatesService {
  constructor(private readonly prisma: PrismaService) {}

  async orderCertificate(
    userId: string,
    dto: CreateCertificateDto,
  ): Promise<CertificateResponseDto> {
    const randomHex = randomBytes(6).toString('hex').toUpperCase();
    const verificationCode = `KZ-2026-${randomHex}`;

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
    const isSigned =
      cert.status === CertificateStatus.SIGNED ||
      cert.status === CertificateStatus.READY;
    const issuedAt = isSigned
      ? cert.processedAt || cert.updatedAt || cert.createdAt
      : null;

    return {
      valid: isSigned,
      verificationCode: cert.verificationCode,
      type: cert.type,
      studentName: cert.user.name || 'Студент ХНУ',
      specialty: student ? `${student.specialtyCode} ${student.specialty}` : 'Не вказано',
      group: student?.group || 'Не вказано',
      university: student?.university || 'Харківський національний університет імені В. Н. Каразіна',
      status: cert.status,
      issuedAt,
      digitalSignature: isSigned
        ? `КЕП ХНУ імені В. Н. Каразіна (Реєстраційний № ${cert.verificationCode})`
        : 'Очікує підписання КЕП',
    };
  }

  async updateStatus(
    id: string,
    dto: UpdateCertificateStatusDto,
    processedBy?: string,
  ): Promise<CertificateResponseDto> {
    if (!processedBy) {
      throw new ForbiddenException('Authentication required');
    }

    const adminUser = await this.prisma.user.findUnique({
      where: { id: processedBy },
    });

    if (
      !adminUser ||
      (adminUser.role !== Role.ADMIN && adminUser.role !== Role.DEAN_OFFICE)
    ) {
      throw new ForbiddenException(
        'Only Dean office staff or administrators can update certificate status',
      );
    }

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
        processedBy: adminUser.name || adminUser.email,
        processedAt: new Date(),
      },
    });
  }
}
