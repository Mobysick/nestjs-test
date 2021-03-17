import { MailerInterface } from "./email.interface";

abstract class AbstractMailer implements MailerInterface {
    abstract sendMail(params: {
        to: string;
        subject: string;
        body: string;
    }): Promise<boolean>;

    async sendTestMail(to: string) {
        const subject = "Test Subject";
        const body = "Hi this is test body.";
        await this.sendMail({ to, subject, body });
    }
}

export default AbstractMailer;
