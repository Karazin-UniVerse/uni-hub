import {
  Body,
  Controller,
  Get,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StudentProfileService } from './student-profile.service';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { StudentProfileResponseDto } from './dto/student-profile-response.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Student Profile')
@Controller('student/profile')
export class StudentProfileController {
  constructor(
    private readonly studentProfileService: StudentProfileService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current student official academic profile' })
  @ApiResponse({ status: 200, type: StudentProfileResponseDto })
  @Get()
  async getProfile(
    @GetUser('sub') userId: string,
  ): Promise<StudentProfileResponseDto> {
    return this.studentProfileService.getProfile(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update student academic profile details' })
  @ApiResponse({ status: 200, type: StudentProfileResponseDto })
  @Patch()
  async updateProfile(
    @GetUser('sub') userId: string,
    @Body() dto: UpdateStudentProfileDto,
  ): Promise<StudentProfileResponseDto> {
    return this.studentProfileService.updateProfile(userId, dto);
  }
}
