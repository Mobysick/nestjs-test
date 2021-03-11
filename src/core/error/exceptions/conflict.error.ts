import { ConflictException } from "@nestjs/common";
import { ApiErrorMessage } from "../api-error-message";

export class ConflictError extends ConflictException {
    constructor(message?: ApiErrorMessage) {
        const errorMessage = message || ApiErrorMessage.CONFLICT;
        super(errorMessage, ApiErrorMessage.CONFLICT);
    }
}
