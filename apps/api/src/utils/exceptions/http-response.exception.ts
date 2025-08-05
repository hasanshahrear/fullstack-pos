import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorResponse } from '../interfaces';
import { Prisma } from '@prisma/client';

//==================================================================================================
/**
 * implements http exception with http response from the service of common module
 * @param statusCode HTTP status
 * @param message custom message
 * @param errors errors
 * @returns error response
 */
export class HttpResponseException extends HttpException {
  constructor({ statusCode, message, errors }: HttpErrorResponse) {
    let finalStatus = statusCode;
    let finalMessage = message;
    let finalErrors: unknown = errors;

    if (errors instanceof Prisma.PrismaClientKnownRequestError) {
      if (errors.code === 'P2002') {
        finalStatus = HttpStatus.CONFLICT;
        finalMessage = `Already exists: ${errors.meta?.target?.toString()}`;
        finalErrors = errors.meta;
      } else {
        finalStatus = HttpStatus.BAD_REQUEST;
        finalMessage = `Database error: ${errors.message}`;
      }
    } else if (errors instanceof Prisma.PrismaClientValidationError) {
      finalStatus = HttpStatus.UNPROCESSABLE_ENTITY;
      finalMessage = `Validation error: ${errors.message}`;
    }

    super(
      {
        statusCode: finalStatus,
        message: finalMessage,
        errors: finalErrors,
      },
      finalStatus,
    );
  }
}

//==================================================================================================
