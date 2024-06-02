export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  verificationToken: string;
  isVerified: boolean;
}
