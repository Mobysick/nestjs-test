import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from "uuid";
import { EnvOption } from "../config/config";
import { AppLogger } from "../logger/logger.service";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        private configService: ConfigService,
        private logger: AppLogger,
    ) {}

    catch(exception: HttpException, host: ArgumentsHost): Response {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = exception.getStatus();

        const env = this.configService.get<EnvOption>("env");

        this.logger.error(exception.name, exception.stack, {
            traceId: uuid(),
            status: exception.getStatus(),
            name: exception.name,
            message: exception.message,
            issuedBy: HttpExceptionFilter.name,
        });

        const issuedBy =
            env === EnvOption.PROD ? undefined : HttpExceptionFilter.name;

        return response.status(statusCode).json({
            status: statusCode,
            message: exception.message,
            issuedBy,
        });
    }
}
