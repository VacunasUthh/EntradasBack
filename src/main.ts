import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: '*', // Permitir todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Permitir todos los métodos
    allowedHeaders: 'Content-Type, Accept, Authorization', // Permitir todos los headers necesarios
    credentials: true,
  }));
  await app.listen(3000);
}
bootstrap();