import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Users } from './../users/entities/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(users: Users, token: string) {
        const url = `localhost/users/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: users.email,
            from: '"Beije Üyelik" <ozgurpeynirci@gmail.com>',
            subject: 'Beije\'ye hoşgeldiniz! Üyeliğinizi tamamlamak için onay linkine tıklayın.',
            context: {
                name: users.username,
                url,
            },
        });
    }
}
