import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const port = configService.get<number>("port");
    await app.listen(port);
    // TODO: Winston logger.
    console.log("App running on port:", port);
}
bootstrap();
