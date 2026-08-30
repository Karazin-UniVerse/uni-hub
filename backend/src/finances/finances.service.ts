import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentTransactionDto } from './dto/create-payment.dto';
import {
  FinancesOverviewResponseDto,
  PaymentTransactionResponseDto,
  ScholarshipRecordResponseDto,
} from './dto/finances-response.dto';
import {
  PaymentStatus,
  PaymentType,
  ScholarshipStatus,
  ScholarshipType,
} from '@prisma/client';

@Injectable()
export class FinancesService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(userId: string): Promise<FinancesOverviewResponseDto> {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Student profile not found');
    }

    const isBudget = profile.paymentType !== PaymentType.CONTRACT;
    const isHighRank = profile.ratingScore >= 85.0;

    return {
      paymentType: profile.paymentType,
      isScholarshipAssigned: isBudget && isHighRank,
      monthlyScholarshipAmount: isBudget && isHighRank ? 2000.0 : 0.0,
      debtAmount: 0.0,
      universityIban: 'UA483510050000026001234567890',
      universityEdrpou: '02071205',
    };
  }

  async getScholarships(
    userId: string,
  ): Promise<ScholarshipRecordResponseDto[]> {
    return this.prisma.scholarshipRecord.findMany({
      where: { userId },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
  }

  async getPayments(
    userId: string,
  ): Promise<PaymentTransactionResponseDto[]> {
    return this.prisma.paymentTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPayment(
    userId: string,
    dto: CreatePaymentTransactionDto,
  ): Promise<PaymentTransactionResponseDto> {
    return this.prisma.paymentTransaction.create({
      data: {
        userId,
        amount: dto.amount,
        purpose: dto.purpose,
        status: PaymentStatus.PENDING,
        recipientName: 'Харківський національний університет імені В. Н. Каразіна',
        recipientIban: 'UA483510050000026001234567890',
        edrpou: '02071205',
      },
    });
  }
}
