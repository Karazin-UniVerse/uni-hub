import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CertificateType, CertificateDeliveryType } from '@prisma/client';

export class CreateCertificateDto {
  @ApiProperty({
    enum: CertificateType,
    example: CertificateType.STUDY_CONFIRMATION,
    description: 'Type of requested certificate',
  })
  @IsEnum(CertificateType)
  @IsNotEmpty()
  type: CertificateType;

  @ApiProperty({
    example: 'За місцем вимоги / ТЦК Шевченківського району',
    description: 'Purpose or institution of presentation',
  })
  @IsString()
  @IsNotEmpty()
  purpose: string;

  @ApiProperty({
    enum: CertificateDeliveryType,
    example: CertificateDeliveryType.DIGITAL_PDF,
    required: false,
  })
  @IsOptional()
  @IsEnum(CertificateDeliveryType)
  deliveryType?: CertificateDeliveryType;
}
