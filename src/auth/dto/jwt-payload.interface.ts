import { UserRole } from "../../user/types/user-role.enum";

export interface JwtPayload {
    id: string;
    email: string;
    roles: UserRole[];
}
