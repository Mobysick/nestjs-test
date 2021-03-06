import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ApiErrorMessage } from "../core/error/api-error-message";
import { UnauthorizedError } from "../core/error/exceptions/unauthorized.conflict";
import { User } from "../user/user.entity";
import { UserRepository } from "../user/user.repository";
import { JwtPayload } from "./dto/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>("jwt.secret"),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { id } = payload;
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new UnauthorizedError(ApiErrorMessage.INVALID_AUTH_TOKEN);
        }

        return user;
    }
}
