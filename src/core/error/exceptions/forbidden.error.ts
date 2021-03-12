import { ForbiddenException } from "@nestjs/common";
import { ApiErrorMessage } from "../api-error-message";

export class ForbiddenError extends ForbiddenException {
    constructor(message?: ApiErrorMessage) {
        const errorMessage = message || ApiErrorMessage.FORBIDDEN;
        super(errorMessage, ApiErrorMessage.FORBIDDEN);
    }
}
