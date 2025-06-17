import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Roles } from './config/constants/roles.constants';
import { RolesGuard } from './auth/guards/roles.guards';
import { Reflector } from '@nestjs/core';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
