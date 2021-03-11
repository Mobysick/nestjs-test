import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { LoggerModule } from "src/core/logger/logger.module";
import { PostController } from "./post.controller";
import { PostAdminController } from "./post.controller.admin";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([PostRepository]),
        AuthModule,
        LoggerModule,
    ],
    controllers: [PostAdminController, PostController],
    providers: [PostService],
})
export class PostModule {}
