import {
	createLogger,
	format,
	transports,
	type Logger as WinstonLogger,
} from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { config } from "../config";

const logLevel = config.app.env === "development" ? "debug" : "warn";

// Define formats
const fileFormat = format.combine(
	format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
	format.errors({ stack: true }),
	format.json(),
);

const consoleFormat = format.combine(
	format.errors({ stack: true }),
	format.colorize(),
	format.label({ label: "🏷" }),
	format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
	format.printf(
		(info) =>
			`${info.level}: ${info.label}: ${info.timestamp}: ${info.message}${
				info.stack ? `\n${info.stack}` : ""
			}`,
	),
);

// File transport options for DailyRotateFile
const fileTransportOptions: DailyRotateFile.DailyRotateFileTransportOptions = {
	level: logLevel,
	filename: "%DATE%.log",
	dirname: "./logs",
	datePattern: "YYYY-MM-DD",
	zippedArchive: true,
	maxSize: "20m",
	maxFiles: "14d",
	format: fileFormat,
};

// Exception file transport options
const exceptionFileOptions: DailyRotateFile.DailyRotateFileTransportOptions = {
	level: "error",
	filename: "exceptions-%DATE%.log",
	dirname: "./logs",
	datePattern: "YYYY-MM-DD",
	zippedArchive: true,
	maxSize: "20m",
	maxFiles: "14d",
	format: fileFormat,
};

const Logger: WinstonLogger = createLogger({
	level: logLevel,
	transports: [
		new transports.Console({
			level: logLevel,
			format: consoleFormat,
		}),
		new DailyRotateFile(fileTransportOptions),
	],
	exceptionHandlers: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.printf((info) => `EXCEPTION: ${info.level}: ${info.message}`),
			),
		}),
		new DailyRotateFile(exceptionFileOptions),
	],
	exitOnError: false,
});

// Test the logger on startup
Logger.info("Logger initialized successfully");

export default Logger;
