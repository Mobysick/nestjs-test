import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { SmtpService } from "../core/email/smtp.service";
import { ApiErrorMessage } from "../core/error/api-error-message";
import { ConflictError } from "../core/error/exceptions/conflict.error";
import { UnauthorizedError } from "../core/error/exceptions/unauthorized.conflict";
import { secureCompare } from "../core/utils/secure-compare";
import { UserRole } from "../user/types/user-role.enum";
import { User } from "../user/user.entity";
import { UserRepository } from "../user/user.repository";
import { JwtPayload } from "./dto/jwt-payload.interface";
import { LoginDto } from "./dto/request/login.request.dto";
import { RegisterDto } from "./dto/request/register.request.dto";
import { AuthPayload } from "./dto/response/auth-payload.response.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private emailService: SmtpService,
    ) {}

    private mapAuthUserPayload(user: User): AuthPayload {
        const payload: JwtPayload = {
            id: user.id,
            email: user.email,
            roles: user.roles,
        };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                roles: user.roles,
            },
        };
    }

    async login(dto: LoginDto): Promise<AuthPayload> {
        const { email, password } = dto;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UnauthorizedError(
                ApiErrorMessage.INVALID_EMAIL_OR_PASSWORD,
            );
        }
        const hash = await bcrypt.hash(password, user.salt);
        if (secureCompare(hash, user.password)) {
            throw new UnauthorizedError(
                ApiErrorMessage.INVALID_EMAIL_OR_PASSWORD,
            );
        }
        return this.mapAuthUserPayload(user);
    }

    async register(dto: RegisterDto): Promise<AuthPayload> {
        const { email, password, firstName, lastName } = dto;
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ConflictError(ApiErrorMessage.ACCOUNT_WITH_EMAIL_EXISTS);
        }
        let user = new User();
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        user.roles = [UserRole.USER];
        user = await user.save();

        return this.mapAuthUserPayload(user);
    }

    async testEmail(email: string) {
        const result = await this.emailService.sendTestMail(email);
        return { success: result };
    }
}
