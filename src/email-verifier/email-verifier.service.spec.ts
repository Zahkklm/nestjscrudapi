import { Test, TestingModule } from '@nestjs/testing';
import { EmailVerifierService } from './email-verifier.service';

describe('EmailverifierService', () => {
  let service: EmailVerifierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailVerifierService],
    }).compile();

    service = module.get<EmailVerifierService>(EmailVerifierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
