import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseResponseDto } from 'src/core/response/baseResponse.dto';
import {
  IResponseObject,
  ResponseCode,
  responseCodeMap,
} from 'src/core/utils/responseCode.util';
import { Request, Response } from 'express';

interface ErrorObject {
  httpStatus: number;
  timestamp: string;
  path: string;
  method: string;
  error: string;
  message: string;
  responseCode?: ResponseCode;
  reasons: string[];
}

@Catch()
export class AppExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    console.log({ exception });

    const httpStatus =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    const messages: Array<string> = [];
    if (exception.getResponse()['message']) {
      if (typeof exception.getResponse()['message'] == 'string') {
        messages.push(exception.getResponse()['message']);
      } else {
        const source = exception.getResponse()['message'][0]['constraints'];
        const keys = Object.keys(source);
        for (const k of keys) {
          messages.push(source[k]);
        }
      }
    }

    const errorObj: ErrorObject = {
      httpStatus: httpStatus,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      error: exception.name,
      message: exception.message || null,
      responseCode: (exception.getResponse() as IResponseObject).code,
      reasons: (exception.getResponse() as IResponseObject).reasons || messages,
    };

    Logger.error(
      `${request.method} ==> ${request.url}`,
      JSON.stringify(errorObj),
      AppExceptionFilter.name,
    );
    const errorResponse: BaseResponseDto = {
      status: false,
      statusCode: httpStatus,
      message: errorObj.message,
      error: {
        httpMethod: errorObj.method,
        requestPath: errorObj.path,
        errorCode:
          responseCodeMap[errorObj.responseCode || ResponseCode.ClientError]
            .code || exception.name,
        description:
          responseCodeMap[errorObj.responseCode || ResponseCode.ClientError]
            .description,
        reasons: errorObj.reasons,
      },
    };
    const template = 'index';
    response.render(template, errorResponse);
  }
}
