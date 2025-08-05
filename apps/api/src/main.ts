import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.flatMap((error) => {
          if (error.constraints) return Object.values(error.constraints);
          if (error.children?.length) {
            return error.children.flatMap((child) =>
              child.constraints ? Object.values(child.constraints) : [],
            );
          }
          return [`property ${error.property} should not exist`];
        });

        return new BadRequestException({
          status: 400,
          message: 'Validation failed',
          errors: messages,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
