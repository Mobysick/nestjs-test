import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from "uuid";
import { EnvOption } from "../config/config";
import { AppLogger } from "../logger/logger.service";
import { ApiErrorMessage } from "./api-error-message";

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
    constructor(
        private configService: ConfigService,
        private logger: AppLogger,
    ) {}

    catch(exception: any, host: ArgumentsHost) {
        const env = this.configService.get<EnvOption>("env");

        this.logger.error(
            ApiErrorMessage.INTERNAL_SERVER_ERROR,
            exception.stack,
            {
                traceId: uuid(),
                name: exception.name,
                message: exception.message,
                issuedBy: FallbackExceptionFilter.name,
            },
        );

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const displayMessage =
            env === EnvOption.PROD
                ? ApiErrorMessage.INTERNAL_SERVER_ERROR
                : exception.message;

        const issuedBy =
            env === EnvOption.PROD ? undefined : FallbackExceptionFilter.name;

        response.status(500).json({
            statusCode: 500,
            message: displayMessage,
            issuedBy,
        });
    }
}
