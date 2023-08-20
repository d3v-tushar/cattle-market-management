import mongoose from 'mongoose';
import app from './app';
import config from './config';

const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database Connection Established');

    app.listen(config.port, () => {
      console.log(`Server is listening on port: ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
