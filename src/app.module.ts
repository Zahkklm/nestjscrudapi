import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmailVerifierModule } from './email-verifier/email-verifier.module';
import { EmailVerifierController } from './email-verifier/email-verifier.controller';
import { EmailVerifierService } from './email-verifier/email-verifier.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, EmailVerifierModule, UsersModule],
  controllers: [AppController, EmailVerifierController],
  providers: [AppService, EmailVerifierService],
})
export class AppModule {}
