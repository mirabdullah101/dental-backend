/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //   app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  // }))
 app.enableCors({
    origin: 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
