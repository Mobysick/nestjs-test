import { Injectable } from "@nestjs/common";
import { UserRole } from "../../user/types/user-role.enum";
import { AuthorizationGuard } from "./authorization.guard";

@Injectable()
export class AdminGuard extends AuthorizationGuard {
    constructor() {
        super([UserRole.ADMIN]);
    }
}
