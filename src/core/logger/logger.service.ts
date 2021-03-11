import { Injectable, Logger, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as winston from "winston";
import { envOption } from "../../config/config";

@Injectable()
export class AppLogger extends Logger implements LoggerService {
    logger: winston.Logger;

    // TODO: Debug and Verbose not working.

    constructor(private configService: ConfigService) {
        super();
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

    private getArgs(args: string | Record<string, unknown>) {
        if (typeof args === "string" || args instanceof String) {
            return { data: args };
        } else {
            return { ...args };
        }
    }

    private addDefaultFields(args: string | Record<string, unknown>) {
        const result = this.getArgs(args);
        return {
            ...result,
            timestamp: new Date().toISOString(),
        };
    }

    log(message: string, data?: any) {
        this.logger.log("info", message, this.addDefaultFields(data));
    }

    error(message: string, trace: string, data?: any) {
        this.logger.log("error", message, {
            ...this.addDefaultFields(data),
            trace,
        });
    }

    warn(message: string, data?: any) {
        this.logger.log("warn", message, this.addDefaultFields(data));
    }

    debug(message: string, data?: any) {
        this.logger.log("debug", message, this.addDefaultFields(data));
    }

    verbose(message: string, data?: any) {
        this.logger.log("verbose", message, this.addDefaultFields(data));
    }
}
