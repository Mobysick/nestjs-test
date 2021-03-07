import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "../auth/guards/admin.guard";

@Controller("test")
export class TestController {
    @Get("public")
    publicRoute() {
        return "Public route";
    }

    @Get("auth")
    @UseGuards(AuthGuard())
    authenticatedRoute() {
        return "Authenticated route";
    }

    @Get("admin")
    @UseGuards(AuthGuard(), AdminGuard)
    adminRoute() {
        return "Admin route";
    }
}
