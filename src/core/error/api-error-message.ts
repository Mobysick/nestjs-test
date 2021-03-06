export enum ApiErrorMessage {
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    NOT_FOUND = "NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    CONFLICT = "CONFLICT",
    BAD_REQUEST = "BAD_REQUEST",

    // Auth
    ACCOUNT_WITH_EMAIL_EXISTS = "ACCOUNT_WITH_EMAIL_EXISTS",
    INVALID_AUTH_TOKEN = "INVALID_AUTH_TOKEN",
    INVALID_EMAIL_OR_PASSWORD = "INVALID_EMAIL_OR_PASSWORD",

    // Post
    POST_NOT_FOUND = "POST_NOT_FOUND",
}
