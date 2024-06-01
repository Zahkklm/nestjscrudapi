import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseInterceptor } from 'src/common/response-interceptor';

@UseInterceptors(ResponseInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    const userDetails = await this.usersService.register(user);
    return { message: 'User registered successfully', userId: userDetails.id };
  }


  @Get('verify-email/:username/:verificationToken')
  async verifyEmail(
    @Param('username') username: string,
    @Param('verificationToken') verificationToken: string,
  ) {
    await this.usersService.verifyEmail(username, verificationToken);
    return { message: 'Email verified successfully' };
  }

  @Get('check-verification/:username')
  async checkVerification(@Param('username') username: string) {
    const isVerified = await this.usersService.checkVerification(username);
    if (isVerified) {
      return 'User is verified'
    }
    else {
      return 'User is not verified';
    }
  }
}


