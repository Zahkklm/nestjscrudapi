import { Module } from '@nestjs/common';
import { EmailVerifierController } from './email-verifier.controller';
import { EmailVerifierService } from './email-verifier.service';

@Module({
  controllers: [EmailVerifierController],
  providers: [EmailVerifierService]
})
export class EmailVerifierModule {}
