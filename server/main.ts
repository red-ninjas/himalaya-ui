import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger("HTTP Server");
  logger.log("ENVIRONMENT", process.env.NODE_ENV);

  const app = await NestFactory.create(ServerModule);
  const port = process.env.PORT || 4000;
  logger.log("Try to start server with port " + port);
  await app.listen(port);

}
bootstrap();