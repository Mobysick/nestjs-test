import { Body, Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/request/login.request.dto";
import { RegisterDto } from "./dto/request/register.request.dto";
import { AuthPayload } from "./dto/response/auth-payload.response.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get("login")
    async login(@Body() dto: LoginDto): Promise<AuthPayload> {
        return this.authService.login(dto);
    }

    @Get("register")
    async register(@Body() dto: RegisterDto): Promise<AuthPayload> {
        return this.authService.register(dto);
    }
}
