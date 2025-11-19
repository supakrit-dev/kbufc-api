import "dotenv/config";
import winston from "winston";
import config from "../config";
const { combine, timestamp, json, errors, printf } = winston.format;


const logger = winston.createLogger({
    level: config.logLevel || "info",
    format: combine(timestamp({
        format: "DD-MM-YYYY hh:mm:ss"
    }),
        errors({ stack: true }),
        json(),
        printf(({ timestamp, level, message, logMetadata, stack }) => {
            return `${timestamp} ${level}: ${logMetadata || ""} ${message} ${stack || ""}`
        })

    ),
    transports: [new winston.transports.Console()]
})

export default logger;

// transports: [
//     new winston.transports.File({ filename: "standard.log" })
// ],
// exceptionHandlers: [new winston.transports.File({ filename: "exception.log" })],
// rejectionHandlers: [new winston.transports.File({ filename: "rejections.log" })]