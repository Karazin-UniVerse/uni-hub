import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePaymentTransactionDto {
  @ApiProperty({ example: 1450.0, description: 'Payment amount in UAH' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    example: 'Оплата за гуртожиток № 4 (вересень 2026)',
    description: 'Purpose of payment',
  })
  @IsString()
  @IsNotEmpty()
  purpose: string;
}
