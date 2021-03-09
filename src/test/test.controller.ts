import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "../auth/guards/admin.guard";
import { AppLogger } from "../core/logger/logger.service";

@Controller("test")
export class TestController {
    constructor(private logger: AppLogger) {
        this.logger.setContext(TestController.name);
    }

    @Get("public")
    publicRoute() {
        this.logger.log("public route", { qwe: "asd" });
        return "Public route";
    }

    @Get("auth")
    @UseGuards(AuthGuard())
    authenticatedRoute() {
        this.logger.warn("auth route", { qwe: "asd" });
        return "Authenticated route";
    }

    @Get("admin")
    @UseGuards(AuthGuard(), AdminGuard)
    adminRoute() {
        this.logger.error("admin route", "123", { qwe: "asd" });
        return "Admin route";
    }
}
