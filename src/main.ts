import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppLogger } from "./core/logger/logger.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });
    const logger = await app.resolve(AppLogger);
    app.useLogger(logger);
    const configService = app.get(ConfigService);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const port = configService.get<number>("port");
    await app.listen(port);
    logger.log("App running...", {
        port,
        timestamp: new Date().toISOString(),
    });

    logger.log("Testing logs...", { type: "info" });
    logger.log("info", { type: "info" });
    logger.error("error", "123", { type: "error" });
    logger.warn("warn", { type: "warn" });
    logger.debug("debug", { type: "debug" });
    logger.verbose("verbose", { type: "verbose" });
}
bootstrap();
