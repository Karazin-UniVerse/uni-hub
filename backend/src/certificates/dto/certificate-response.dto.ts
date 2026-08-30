import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CertificateType,
  CertificateDeliveryType,
  CertificateStatus,
} from '@prisma/client';

export class CertificateResponseDto {
  @ApiProperty({ example: 'a8f9-4b21-uuid' })
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @ApiProperty({ enum: CertificateType })
  type: CertificateType;

  @ApiProperty({ example: 'За місцем вимоги' })
  purpose: string;

  @ApiProperty({ enum: CertificateDeliveryType })
  deliveryType: CertificateDeliveryType;

  @ApiProperty({ enum: CertificateStatus })
  status: CertificateStatus;

  @ApiProperty({ example: 'KZ-2026-DOC-4920' })
  verificationCode: string;

  @ApiPropertyOptional({ example: 'https://storage.karazin.ua/doc.pdf' })
  pdfUrl?: string | null;

  @ApiPropertyOptional({ example: 'Rejection explanation' })
  rejectionReason?: string | null;

  @ApiPropertyOptional()
  processedBy?: string | null;

  @ApiPropertyOptional()
  processedAt?: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CertificateVerificationResponseDto {
  @ApiProperty({ example: true })
  valid: boolean;

  @ApiProperty({ example: 'KZ-2026-DOC-4920' })
  verificationCode: string;

  @ApiProperty({ enum: CertificateType })
  type: CertificateType;

  @ApiProperty({ example: 'Олександр Петренко' })
  studentName: string;

  @ApiProperty({ example: '122 Комп’ютерні науки' })
  specialty: string;

  @ApiProperty({ example: 'КС-12' })
  group: string;

  @ApiProperty({ example: 'Харківський національний університет імені В. Н. Каразіна' })
  university: string;

  @ApiProperty({ enum: CertificateStatus })
  status: CertificateStatus;

  @ApiPropertyOptional({ nullable: true })
  issuedAt?: Date | null;

  @ApiProperty({ example: 'ЕЦП Сертифікат № 492019-ХНУ (ВАЛІДНИЙ)' })
  digitalSignature: string;
}
