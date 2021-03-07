import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export type JwtConfigType = {
    secret: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
};

type AppConfigType = {
    port: number;
    jwt: JwtConfigType;
    db: TypeOrmModuleOptions;
};

export const getAppConfig = (): AppConfigType => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    jwt: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiresIn: parseInt(
            process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
            10,
        ),
        refreshTokenExpiresIn: parseInt(
            process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
            10,
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
