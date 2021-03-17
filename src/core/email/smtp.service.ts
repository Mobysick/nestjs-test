import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { SmtpConfigType } from "../config/config";
import { AppLogger } from "../logger/logger.service";
import { MailerInterface } from "./email.interface";
import AbstractMailer from "./email.service";

@Injectable()
export class SmtpService extends AbstractMailer implements MailerInterface {
    transporter: Mail;
    config: SmtpConfigType;

    constructor(
        private configService: ConfigService,
        private logger: AppLogger,
    ) {
        super();
        this.config = this.configService.get<SmtpConfigType>("smtp");
        this.transporter = createTransport({
            host: this.config.host,
            port: this.config.port,
            secure: false,
            auth: {
                user: this.config.user,
                pass: this.config.pass,
            },
        });
    }

    async sendMail(params: {
        to: string;
        subject: string;
        body: string;
    }): Promise<boolean> {
        const { to, subject, body } = params;

        try {
            const info = await this.transporter.sendMail({
                from: `"Nest Test" ${this.config.from}`,
                to: to,
                subject: subject,
                text: body,
                html: body,
            });
            this.logger.log("Email sent", {
                id: info.messageId,
                to,
                subject,
                body,
            });
            return true;
        } catch (error) {
            this.logger.error("Email error", error.stack, error);
            return false;
        }
    }
}
