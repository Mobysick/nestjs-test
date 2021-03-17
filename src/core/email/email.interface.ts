export interface MailerInterface {
    // sendEmailVerification(user: User): Promise<void>;

    // sendPasswordReset(user: User): Promise<void>;

    sendTestMail(to: string): Promise<void>;

    sendMail(params: {
        to: string;
        subject: string;
        body: string;
    }): Promise<boolean>;
}
