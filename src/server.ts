import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database Connection Established');

    app.listen(config.port, () => {
      logger.info(`Server is listening on port: ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(error);
  }
};

bootstrap();
