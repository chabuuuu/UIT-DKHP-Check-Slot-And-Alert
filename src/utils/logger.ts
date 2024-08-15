import winston from "winston";
export const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "result.log" })],
  format: winston.format.simple(),
});
