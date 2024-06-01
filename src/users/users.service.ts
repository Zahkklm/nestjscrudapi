import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { randomBytes } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private readonly mailService: MailService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async register(createUserDto: CreateUserDto): Promise<Users> { // register function that creates token, saves user and sends confirmation mail
  //  const verificationToken = randomBytes(32).toString('hex'); // later change this to bcrypt function
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

  async verifyEmail(username: string, verificationToken: string): Promise<boolean> { // async verifyEmail service to work when email link is entered
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.verificationToken !== verificationToken) {
      throw new Error('Invalid verification token');
    }

    user.isVerified = true;
    await this.userRepository.save(user);
    return true;
  }

  async checkVerification(username: string): Promise<boolean> { // async checkVerification to see if user isVerified: boolean value true
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new Error('User not found');
    }

    return user.isVerified;
  }
}

