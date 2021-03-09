import { Injectable, Logger, LoggerService, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as winston from "winston";
import { envOption } from "../../config/config";

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends Logger implements LoggerService {
    logger: winston.Logger;

    // TODO: Debug and Verbose not working.

    constructor(private configService: ConfigService, context?: string) {
        super(context);
        this.logger = winston.createLogger({
            format: winston.format.colorize({
                colors: {
                    info: "green",
                    error: "red",
                    warn: "blue",
                    debug: "blue",
                    verbose: "gray",
                },
            }),
            levels: winston.config.npm.levels,
            transports: [
                new winston.transports.Console({
                    format: winston.format.simple(),
                }),
            ],
        });

        const env = configService.get<envOption>("env");

        if (env === envOption.PROD) {
            this.logger.add(
                new winston.transports.File({
                    filename: "error.log",
                    level: "error",
                    format: winston.format.json(),
                }),
            );
        }
    }

    log(message: string, data?: any) {
        this.logger.log("info", message, data);
    }

    error(message: string, trace: string, data?: any) {
        this.logger.log("error", message, {
            ...data,
            trace,
            timestamp: new Date(),
        });
    }

    warn(message: string, data?: any) {
        this.logger.log("warn", message, data);
    }

    debug(message: string, data?: any) {
        this.logger.log("debug", message, data);
    }

    verbose(message: string, data?: any) {
        this.logger.log("verbose", message, data);
    }
}
