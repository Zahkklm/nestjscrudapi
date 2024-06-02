import { UsersService } from './users.service';
import * as nodemailer from 'nodemailer';
import { UsersController } from './users.controller';

const mockUserData = {
  userId: 'ssadcxaewuuid',
  username: 'testuser',
  email: 'test@example.com',
  verificationToken: 'sometoken',
  isVerified: false,
  password: 'xxxbb',
};

describe('UserService', () => {
  let userService: UsersService;
  let usersController: UsersController;
  let mockTransporter;

  beforeEach(async () => {
    mockTransporter = {
      sendMail: jest.fn().mockResolvedValue(null),
    };
    jest.spyOn(nodemailer, 'createTransport').mockReturnValue(mockTransporter);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should register a user', async () => {
    jest.spyOn(usersController, 'register');
    const username = 'testuser';
    const email = 'test@example.com';
    const verificationToken = 'sometoken';

    await userService.register(mockUserData);

    expect(usersController.register).toHaveBeenCalledWith(
      expect.objectContaining({
        username: username,
        email: email,
        isVerified: false,
        verificationToken: expect.any(String),
      }),
    );

    expect(mockTransporter.sendMail).toHaveBeenCalledWith({
      from: 'peynirciozgur011@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: http://localhost:3000/user/verify-email/${username}/${verificationToken}`,
    });
  });

  it('should verify a user email', async () => {
    jest.spyOn(usersController, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUserData),
    } as any);
    await userService.verifyEmail('testuser', 'sometoken');
    expect(usersController.findOne).toHaveBeenCalledWith({
      username: 'testuser',
    });
  });

  it('should check if a user is verified', async () => {
    jest.spyOn(usersController, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUserData),
    } as any);
    const result = await userService.checkVerification('testuser');
    expect(result).toEqual('User is not verified');
  });
});
