import winston from "winston";

const { combine, timestamp, errors, printf, prettyPrint } = winston.format;

export const logFormat = printf(({ timestamp, level, message, stack }) => {
  return `\n[${timestamp}] \n ${level} :- ${stack || message}`;
});

export const loggerFormat = combine(
  timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  errors({
    stack: true,
  }),
  logFormat,
  prettyPrint()
);
