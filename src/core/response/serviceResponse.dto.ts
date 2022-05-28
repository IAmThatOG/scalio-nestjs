import { BaseResponseDto } from './baseResponse.dto';

export class ServiceResponseDto<T> extends BaseResponseDto {
  payload: T;
}
