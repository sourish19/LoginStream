import { createLogger, format, transports, addColors } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let extra = Object.keys(metadata).length ? JSON.stringify(metadata) : '';
  return `${timestamp} :: ${level}: ${message} :: ${extra}`;
});

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

addColors(colors);

const logger = createLogger({
  format: combine(
    colorize({ all: true }),
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    myFormat
  ),
  transports: [new transports.Console()],
});

export default logger;
