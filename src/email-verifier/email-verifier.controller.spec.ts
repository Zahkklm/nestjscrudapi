import { Test, TestingModule } from '@nestjs/testing';
import { EmailVerifierController } from './email-verifier.controller';

describe('EmailverifierController', () => {
  let controller: EmailVerifierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailVerifierController],
    }).compile();

    controller = module.get<EmailVerifierController>(EmailVerifierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
