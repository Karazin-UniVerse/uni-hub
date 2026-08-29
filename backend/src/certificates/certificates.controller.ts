import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateStatusDto } from './dto/update-certificate-status.dto';
import {
  CertificateResponseDto,
  CertificateVerificationResponseDto,
} from './dto/certificate-response.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Order a new certificate (E-Dean office)' })
  @ApiResponse({ status: 201, type: CertificateResponseDto })
  @Post('order')
  async orderCertificate(
    @GetUser('sub') userId: string,
    @Body() dto: CreateCertificateDto,
  ): Promise<CertificateResponseDto> {
    return this.certificatesService.orderCertificate(userId, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user certificate requests history' })
  @ApiResponse({ status: 200, type: [CertificateResponseDto] })
  @Get('my')
  async getMyCertificates(
    @GetUser('sub') userId: string,
  ): Promise<CertificateResponseDto[]> {
    return this.certificatesService.getMyCertificates(userId);
  }

  @Public()
  @ApiOperation({ summary: 'Public QR Code certificate legitimacy verification' })
  @ApiParam({ name: 'code', description: 'Unique certificate verification code' })
  @ApiResponse({ status: 200, type: CertificateVerificationResponseDto })
  @Get('verify/:code')
  async verifyCertificate(
    @Param('code') code: string,
  ): Promise<CertificateVerificationResponseDto> {
    return this.certificatesService.verifyCertificate(code);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get certificate details by ID' })
  @ApiParam({ name: 'id', description: 'Certificate request ID' })
  @ApiResponse({ status: 200, type: CertificateResponseDto })
  @Get(':id')
  async getCertificateById(
    @Param('id') id: string,
    @GetUser('sub') userId: string,
  ): Promise<CertificateResponseDto> {
    return this.certificatesService.getCertificateById(id, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update certificate request status (Dean office)' })
  @ApiParam({ name: 'id', description: 'Certificate request ID' })
  @ApiResponse({ status: 200, type: CertificateResponseDto })
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateCertificateStatusDto,
    @GetUser('sub') adminId: string,
  ): Promise<CertificateResponseDto> {
    return this.certificatesService.updateStatus(id, dto, adminId);
  }
}
