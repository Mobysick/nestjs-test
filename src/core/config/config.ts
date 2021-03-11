import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export enum envOption {
    DEV = "DEV",
    PROD = "PROD",
}

export type JwtConfigType = {
    secret: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
};

type AppConfigType = {
    env: envOption;
    port: number;
    jwt: JwtConfigType;
    db: TypeOrmModuleOptions;
};

export const getAppConfig = (): AppConfigType => ({
    env: (process.env.ENV as envOption) || envOption.DEV,
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
    },
});
