import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from "uuid";
import { envOption } from "../../config/config";
import { AppLogger } from "../logger/logger.service";
import { ApiErrorMessage } from "./api-error-message";

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
    constructor(
        private configService: ConfigService,
        private logger: AppLogger,
    ) {}

    catch(exception: any, host: ArgumentsHost) {
        const env = this.configService.get<envOption>("env");

        const trace = uuid();
        this.logger.error(ApiErrorMessage.INTERNAL_SERVER_ERROR, trace, {
            name: exception.name,
            message: exception.message,
            stack: exception.stack,
            issuedBy: FallbackExceptionFilter.name,
        });

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const displayMessage =
            env === envOption.PROD
                ? ApiErrorMessage.INTERNAL_SERVER_ERROR
                : exception.message;

        const issuedBy =
            env === envOption.PROD ? undefined : FallbackExceptionFilter.name;

        response.status(500).json({
            statusCode: 500,
            message: displayMessage,
            issuedBy,
        });
    }
}
