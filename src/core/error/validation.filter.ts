import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ValidationException } from "./validation.exception";

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp(),
            response = ctx.getResponse();

        return response.status(400).json({
            statusCode: 400,
            message: exception.validationErrors,
            error: "Bad Request",
        });
    }
}
