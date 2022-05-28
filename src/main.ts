import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ClientModule } from './api/api.module';
import { AppExceptionFilter } from './api/filters/appException.filter';
import configuration from './core/config/index';
import { CoreModule } from './core/core.module';

async function bootstrap() {
  const config = configuration();
  const app = await NestFactory.create<NestExpressApplication>(ClientModule);
  app.useGlobalFilters(new AppExceptionFilter());
  app.useStaticAssets(join(__dirname, '..', config.staticDir));
  app.setBaseViewsDir(join(__dirname, '..', config.viewsDir));
  app.setViewEngine(config.templateViewEngine);
  await app.listen(config.port);
}
bootstrap();
