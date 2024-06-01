import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { randomBytes } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { userInfo } from 'os';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private readonly mailService: MailService,
  ) { }


  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<Users | null> {
    return this.userRepository.findOneBy( {id} );
  }

  async register(createUserDto: CreateUserDto): Promise<Users> { // register function that creates token, saves user and sends confirmation mail
    const verificationToken = await bcrypt.hash(createUserDto.password, 10); // hashing function
    const user = this.userRepository.create({
      ...createUserDto,
      verificationToken,
      isVerified: false,
    });

    await this.userRepository.save(user);

    // Send verification email
    await this.mailService.sendUserConfirmation(user, verificationToken);

    return user;
  }

  async verifyEmail(username: string, verificationToken: string): Promise<HttpStatus> { // async verifyEmail service to work when email link is entered
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException("Username is not found.", HttpStatus.NOT_FOUND); // HTTP CODE: 404
    }
    if (user.verificationToken !== verificationToken) {
      throw new HttpException("Invalid Token", HttpStatus.BAD_REQUEST);// HTTP CODE: 400
    }
    user.isVerified = true;
    await this.userRepository.save(user);
    return 200;
  }

  async checkVerification(username: string): Promise<boolean> { // async checkVerification to see if user isVerified: boolean value true
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException("Username is not found.", HttpStatus.NOT_FOUND);
    }

    return user.isVerified;
  }
}

