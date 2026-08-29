import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PaymentStatus,
  ScholarshipStatus,
  ScholarshipType,
  PaymentType,
} from '@prisma/client';

export class PaymentTransactionResponseDto {
  @ApiProperty({ example: 'pay-uuid' })
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @ApiProperty({ example: 1450.0 })
  amount: number;

  @ApiProperty({ example: 'Оплата за проживання в гуртожитку' })
  purpose: string;

  @ApiProperty({ enum: PaymentStatus })
  status: PaymentStatus;

  @ApiProperty({ example: 'Харківський національний університет імені В. Н. Каразіна' })
  recipientName: string;

  @ApiProperty({ example: 'UA123456789012345678901234567' })
  recipientIban: string;

  @ApiProperty({ example: '02071205' })
  edrpou: string;

  @ApiPropertyOptional({ example: 'https://storage.karazin.ua/receipts/rec-9812.pdf' })
  receiptUrl?: string | null;

  @ApiPropertyOptional()
  paidAt?: Date | null;

  @ApiProperty()
  createdAt: Date;
}

export class ScholarshipRecordResponseDto {
  @ApiProperty({ example: 'sch-uuid' })
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @ApiProperty({ example: 9 })
  month: number;

  @ApiProperty({ example: 2026 })
  year: number;

  @ApiProperty({ enum: ScholarshipType })
  type: ScholarshipType;

  @ApiProperty({ example: 2000.0 })
  amount: number;

  @ApiProperty({ enum: ScholarshipStatus })
  status: ScholarshipStatus;

  @ApiPropertyOptional({ example: '•••• 8492' })
  bankCardMask?: string | null;

  @ApiPropertyOptional()
  paidAt?: Date | null;

  @ApiProperty()
  createdAt: Date;
}

export class FinancesOverviewResponseDto {
  @ApiProperty({ enum: PaymentType, example: PaymentType.BUDGET })
  paymentType: PaymentType;

  @ApiProperty({ example: true, description: 'Whether student is entitled to scholarship' })
  isScholarshipAssigned: boolean;

  @ApiProperty({ example: 2000.0, description: 'Monthly scholarship amount' })
  monthlyScholarshipAmount: number;

  @ApiProperty({ example: 0.0, description: 'Current debt amount if any' })
  debtAmount: number;

  @ApiProperty({ example: 'UA123456789012345678901234567' })
  universityIban: string;

  @ApiProperty({ example: '02071205' })
  universityEdrpou: string;
}
