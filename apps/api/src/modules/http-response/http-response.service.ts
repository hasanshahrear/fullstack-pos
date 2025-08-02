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
   * @param status HTTP status
   * @returns message
   */
  private getMessage(status: number): string {
    return HttpResponseMessages[
      HttpStatus[status].toString() as keyof typeof HttpResponseMessages
    ];
  }

  //==================================================================================================
  /**
   * gets the description
   * @param status HTTP status
   * @returns description
   */
  private getDescription(status: number): string {
    return HttpResponseDescriptions[
      HttpStatus[status].toString() as keyof typeof HttpResponseMessages
    ];
  }

  //==================================================================================================
  /**
   * generates the HTTP response
   * @param status HTTP status
   * @param data data
   * @param message custom message
   * @param description custom description
   * @returns response
   */
  generate(
    status: number,
    data: Record<string, unknown> | unknown[] | null = {},
    message: string = this.getMessage(status),
    description: string = this.getDescription(status),
  ): HttpResponse {
    const response: HttpResponse = {
      status: status,
      message: message,
      description: description,
      data: data,
    };

    return response;
  }
}
