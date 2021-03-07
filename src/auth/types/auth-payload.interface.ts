import { UserRole } from "../../user/user-role.enum";

export class AuthPayloadUser {
    id: string;
    email: string;
    roles: UserRole[];
}

export class AuthPayload {
    accessToken: string;
    accessTokenExpiresIn?: number;
    refreshToken?: string;
    refreshTokenExpiresIn?: number;
    user: AuthPayloadUser;
}
