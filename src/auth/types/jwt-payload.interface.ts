import { UserRole } from "../../user/user-role.enum";

export interface JwtPayload {
    id: string;
    email: string;
    roles: UserRole[];
}
