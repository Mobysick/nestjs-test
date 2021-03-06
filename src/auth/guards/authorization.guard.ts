import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ForbiddenError } from "../../core/error/exceptions/forbidden.error";
import { UserRole } from "../../user/types/user-role.enum";

export class AuthorizationGuard implements CanActivate {
    constructor(private allowedRoles: UserRole[]) {}

    canActivate(context: ExecutionContext): boolean {
        const host = context.switchToHttp(),
            request = host.getRequest();

        const user = request["user"];
        const allowed = this.isAllowed(user.roles);
        if (!allowed) {
            throw new ForbiddenError();
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
