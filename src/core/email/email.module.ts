import { Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { SmtpService } from "./smtp.service";

@Module({
    imports: [LoggerModule],
    providers: [SmtpService],
    exports: [SmtpService],
})
export class EmailModule {}
