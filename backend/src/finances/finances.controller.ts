import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FinancesService } from './finances.service';
import { CreatePaymentTransactionDto } from './dto/create-payment.dto';
import {
  FinancesOverviewResponseDto,
  PaymentTransactionResponseDto,
  ScholarshipRecordResponseDto,
} from './dto/finances-response.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Finances')
@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current student financial overview and scholarship eligibility' })
  @ApiResponse({ status: 200, type: FinancesOverviewResponseDto })
  @Get('overview')
  async getOverview(
    @GetUser('sub') userId: string,
  ): Promise<FinancesOverviewResponseDto> {
    return this.financesService.getOverview(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get student scholarship accrual and payout records' })
  @ApiResponse({ status: 200, type: [ScholarshipRecordResponseDto] })
  @Get('scholarships')
  async getScholarships(
    @GetUser('sub') userId: string,
  ): Promise<ScholarshipRecordResponseDto[]> {
    return this.financesService.getScholarships(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment transaction history' })
  @ApiResponse({ status: 200, type: [PaymentTransactionResponseDto] })
  @Get('payments')
  async getPayments(
    @GetUser('sub') userId: string,
  ): Promise<PaymentTransactionResponseDto[]> {
    return this.financesService.getPayments(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new payment transaction / invoice' })
  @ApiResponse({ status: 201, type: PaymentTransactionResponseDto })
  @Post('payments')
  async createPayment(
    @GetUser('sub') userId: string,
    @Body() dto: CreatePaymentTransactionDto,
  ): Promise<PaymentTransactionResponseDto> {
    return this.financesService.createPayment(userId, dto);
  }
}
