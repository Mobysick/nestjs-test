import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { GeneralEntitySubscriber } from "../entity/subscribers/general.entity.subscriber";

export enum EnvOption {
    DEV = "DEV",
    PROD = "PROD",
}

export type JwtConfigType = {
    secret: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
};

export enum CacheDuration {
    "SHORT" = 1000 * 30, // 30 Seconds
    "MEDIUM" = 1000 * 60 * 10, // 10 Minutes
    "LONG" = 1000 * 60 * 60 * 3, // 3 Hour
    "EXTREME" = 1000 * 60 * 60 * 24, // 1 Day
}

type AppConfigType = {
    env: EnvOption;
    port: number;
    jwt: JwtConfigType;
    db: TypeOrmModuleOptions;
    cache: {
        durations: {
            short: number;
            medium: number;
            long: number;
            extreme: number;
        };
    };
};

export const getAppConfig = (): AppConfigType => ({
    env: (process.env.ENV as EnvOption) || EnvOption.DEV,
    port: parseInt(process.env.PORT) || 3000,
    jwt: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
        refreshTokenExpiresIn: parseInt(
            process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        ),
    },
    db: {
        type: "mysql",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: Boolean(process.env.DB_SYNC),
        cache: {
            type: "redis",
            options: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT),
            },
        },
        subscribers: [GeneralEntitySubscriber],
    },
    cache: {
        durations: {
            short: CacheDuration.SHORT,
            medium: CacheDuration.MEDIUM,
            long: CacheDuration.LONG,
            extreme: CacheDuration.EXTREME,
        },
    },
});
