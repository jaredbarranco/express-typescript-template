// See https://github.com/fless-lab/node-ts-starter/blob/master/src/common/shared/services/logger.service.ts
import { createLogger, format, transports, Logger, config } from 'winston';
import { logger as ExpressLogger, LoggerOptionsWithWinstonInstance } from 'express-winston'
import { Format } from 'logform';
import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'


export class LoggerService {
	private logger: Logger;

	constructor(correlationId: string, jobId?: string | null) {
		const logFormat: Format = format.combine(
			format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			format.printf((info) => {
				const { level, message, timestamp, expressObj, ...metadata } = info;
				return `[${timestamp}] (${level}): ${correlationId} | ${message} ${JSON.stringify(metadata.content) || ''}`;
			})
		);

		this.logger = createLogger({
			level: 'debug',
			levels: config.npm.levels,
			format: logFormat,
			transports: [
				new transports.File({ filename: 'logs/error.log', level: 'error' }),
				new transports.File({ filename: 'logs/combined.log' }),
			],
			exceptionHandlers: [
				new transports.File({ filename: 'logs/exceptions.log' }),
			],
		});

		// Environments other than production
		if (process.env.NODE_ENV !== 'prod') {
			this.logger.add(
				new transports.Console({
					format: format.combine(format.colorize(), logFormat),
				}),
			);
		}
	}

	log(level: string, message: string, metadata?: Record<string, any>): void {
		this.logger.log({ level, message, ...metadata });
	}

	info(message: string, metadata?: Record<string, any>): void {
		this.logger.info(message, metadata);
	}

	debug(message: string, metadata?: Record<string, any>): void {
		this.logger.debug(message, metadata);
	}

	warn(message: string, metadata?: Record<string, any>): void {
		this.logger.warn(message, metadata);
	}

	error(message: string, error?: Error): void {
		this.logger.error(message, { error: error?.stack || error });
	}
}

