import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppLogger } from "./core/logger/logger.service";
import * as helmet from "helmet";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const logger = await app.resolve(AppLogger);

    app.useLogger(logger);

    //security steps
    app.use(helmet());
    app.enableCors();

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
