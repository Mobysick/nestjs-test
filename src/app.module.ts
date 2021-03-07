import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { getAppConfig } from "./config/config";
import { TestModule } from "./test/test.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [getAppConfig],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return configService.get<TypeOrmModuleOptions>("db");
            },
            inject: [ConfigService],
        }),
        AuthModule,
        TestModule,
        UserModule,
    ],
})
export class AppModule {}
