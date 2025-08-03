import { HttpException } from '@nestjs/common';
import { HttpErrorResponse } from '../interfaces';

//==================================================================================================
/**
 * implements http exception with http response from the service of common module
 */
export class HttpResponseException extends HttpException {
  /**
   * Http response exception contructor
   * @param statusCode HTTP status
   * @param message custom message
   * @param errors errors
   * @returns error response
   */
  constructor({ statusCode, message, errors }: HttpErrorResponse) {
    super(
      {
        statusCode,
        message,
        errors,
      },
      statusCode,
    );
  }
}

//==================================================================================================
