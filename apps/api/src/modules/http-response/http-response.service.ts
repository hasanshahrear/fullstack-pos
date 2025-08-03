import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpResponseDescriptions, HttpResponseMessages } from 'src/utils/enum';
import { HttpResponse } from 'src/utils/interfaces';

/**
 * HTTP response service
 */
@Injectable()
export class HttpResponseService {
  //==================================================================================================
  /**
   * gets the message
   * @param statusCode HTTP status
   * @returns message
   */
  private getMessage(statusCode: number): string {
    return HttpResponseMessages[
      HttpStatus[statusCode].toString() as keyof typeof HttpResponseMessages
    ];
  }

  //==================================================================================================
  /**
   * gets the description
   * @param statusCode HTTP status
   * @returns description
   */
  private getDescription(statusCode: number): string {
    return HttpResponseDescriptions[
      HttpStatus[statusCode].toString() as keyof typeof HttpResponseMessages
    ];
  }

  //==================================================================================================
  /**
   * generates the HTTP response
   * @param statusCode HTTP statusCode
   * @param data data
   * @param message custom message
   * @param description custom description
   * @returns response
   */
  generate(
    statusCode: number,
    data: Record<string, unknown> | unknown[] | null = {},
    message: string = this.getMessage(statusCode),
    description: string = this.getDescription(statusCode),
  ): HttpResponse {
    const response: HttpResponse = {
      statusCode: statusCode,
      message: message,
      description: description,
      data: data,
    };

    return response;
  }
}
