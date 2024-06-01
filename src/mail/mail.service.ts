import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Users } from './../users/entities/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(user: Users, token: string) {
        const url = `localhost:3000/user/verify-email?=${user.username}&${token}`;
        const plaintext = `Üyeliğinizi doğrulamak için linke tıklayın: ${url}`;

        await this.mailerService.sendMail({
            to: user.email,
            from: '"Beije Üyelik" <ozgurpeynirci@gmail.com>',
            subject: 'Beije\'ye hoşgeldiniz! Üyeliğinizi tamamlamak için onay linkine tıklayın.',
            text: plaintext,
        });
    }
}
