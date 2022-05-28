import { ErrorResponseDto } from './errorResponse.dto';

export class BaseResponseDto {
  status: boolean;
  statusCode: number;
  message?: string;
  error?: ErrorResponseDto;
}
