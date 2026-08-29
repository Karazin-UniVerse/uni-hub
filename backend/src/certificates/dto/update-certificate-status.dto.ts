import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CertificateStatus } from '@prisma/client';

export class UpdateCertificateStatusDto {
  @ApiProperty({
    enum: CertificateStatus,
    example: CertificateStatus.SIGNED,
    description: 'New status for the certificate request',
  })
  @IsEnum(CertificateStatus)
  @IsNotEmpty()
  status: CertificateStatus;

  @ApiPropertyOptional({
    example: 'Неповні дані або академвідпустка',
    description: 'Reason if request is rejected',
  })
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @ApiPropertyOptional({
    example: 'https://storage.karazin.ua/certificates/doc-4920.pdf',
    description: 'URL of generated and signed PDF document',
  })
  @IsOptional()
  @IsString()
  pdfUrl?: string;
}
