import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseInterceptor } from 'src/common/response-interceptor';

@UseInterceptors(ResponseInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('register')
  // For HTTP endpoint: POST /user/register:
  async register(
    @Param('username') username: string,
    @Param('email') email: string,
    @Body() user: CreateUserDto,
  ) {
    const userDetails = await this.usersService.register(user);
    return { message: 'User registered successfully', userId: userDetails.id };
  }

  @Get('verify-email/:username/:verificationToken')
  // For HTTP endpoint: GET /user/verify-email/{username}/{verificationToken}
  async verifyEmail(
    @Param('username') username: string,
    @Param('verificationToken') verificationToken: string,
  ) {
    await this.usersService.verifyEmail(username, verificationToken);
    return { message: 'Email verified successfully' };
  }

  @Get('check-verification/:username')
  // For HTTP endpoint: GET /user/check-verification/{username}:
  async checkVerification(@Param('username') username: string) {
    const isVerified = await this.usersService.checkVerification(username);
    if (isVerified) {
      return 'User is verified';
    } else {
      return 'User is not verified';
    }
  }
}
