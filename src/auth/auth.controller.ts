import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/request/login.request.dto";
import { RegisterDto } from "./dto/request/register.request.dto";
import { AuthPayload } from "./dto/response/auth-payload.response.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(@Body() dto: LoginDto): Promise<AuthPayload> {
        return this.authService.login(dto);
    }

    @Post("register")
    async register(@Body() dto: RegisterDto): Promise<AuthPayload> {
        return this.authService.register(dto);
    }

    @Post("test-email")
    async testEmail(
        @Body("email")
        email: string,
    ): Promise<boolean> {
        await this.authService.testEmail(email);
        return true;
    }
}
