import { UnauthorizedException } from "@nestjs/common";
import { ApiErrorMessage } from "../api-error-message";

export class UnauthorizedError extends UnauthorizedException {
    constructor(message?: ApiErrorMessage) {
        const errorMessage = message || ApiErrorMessage.UNAUTHORIZED;
        super(errorMessage, ApiErrorMessage.UNAUTHORIZED);
    }
}
