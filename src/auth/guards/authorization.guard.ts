import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from "@nestjs/common";
import { UserRole } from "../../user/user-role.enum";

export class AuthorizationGuard implements CanActivate {
    constructor(private allowedRoles: UserRole[]) {}

    canActivate(context: ExecutionContext): boolean {
        const host = context.switchToHttp(),
            request = host.getRequest();

        const user = request["user"];
        const allowed = this.isAllowed(user.roles);
        if (!allowed) {
            throw new ForbiddenException();
        }
        return true;
    }

    isAllowed(userRoles: UserRole[]): boolean {
        let allowed = false;
        userRoles.forEach((userRole) => {
            if (!allowed && this.allowedRoles.includes(userRole)) {
                allowed = true;
            }
        });
        return allowed;
    }
}
