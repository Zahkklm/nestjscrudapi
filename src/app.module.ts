import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmailVerifierModule } from './email-verifier/email-verifier.module';
import { EmailVerifierController } from './email-verifier/email-verifier.controller';
import { EmailVerifierService } from './email-verifier/email-verifier.service';
import { UserModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, EmailVerifierModule, UserModule, MailModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController, EmailVerifierController],
  providers: [AppService, EmailVerifierService],
})
export class AppModule {}
