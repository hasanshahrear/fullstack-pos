import { HttpException } from '@nestjs/common';
import { HttpErrorResponse } from '../interfaces';

//==================================================================================================
/**
 * implements http exception with http response from the service of common module
 */
export class HttpResponseException extends HttpException {
  /**
   * Http response exception contructor
   * @param status HTTP status
   * @param message custom message
   * @param errors errors
   * @returns error response
   */
  constructor({ status, message, errors }: HttpErrorResponse) {
    super(
      {
        status,
        message,
        errors,
      },
      status,
    );
  }
}

//==================================================================================================
