import { ValidationError, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as helmet from "helmet";
import { AppModule } from "./app.module";
import { FallbackExceptionFilter } from "./core/error/fallback.filter";
import { HttpExceptionFilter } from "./core/error/http.filter";
import { ValidationException } from "./core/error/validation.exception";
import { ValidationFilter } from "./core/error/validation.filter";
import { AppLogger } from "./core/logger/logger.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const logger = await app.resolve(AppLogger);

    app.useLogger(logger);

    //security steps
    app.use(helmet());
    app.enableCors();

    app.useGlobalFilters(
        new FallbackExceptionFilter(configService, logger),
        new HttpExceptionFilter(configService, logger),
        new ValidationFilter(),
    );

    app.useGlobalPipes(
        new ValidationPipe({
            skipMissingProperties: false,
            exceptionFactory: (errors: ValidationError[]) => {
                const messages = errors.reduce((prev, current) => {
                    prev.push(...Object.values(current.constraints));
                    return prev;
                }, []);
                return new ValidationException(messages);
            },
        }),
    );

    const openApiConfig = new DocumentBuilder()
        .setTitle("Nest Test")
        .setDescription("Nest Test structure for crud operations")
        .setVersion("1.0")
        .addTag("nest")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, openApiConfig);
    SwaggerModule.setup("api", app, document);

    const port = configService.get<number>("port");
    const env = configService.get<number>("env");
    await app.listen(port);
    logger.log("App running...", { port, env });
}
bootstrap();
