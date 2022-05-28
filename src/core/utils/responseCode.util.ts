export interface IBaseResponseObject {
  statusCode: string;
  message: string;
}
export interface IResponseObject {
  code: ResponseCode;
  reasons: string[];
}

export const enum ResponseCode {
  ServerError = 0,
  ClientError = 1,
  PostNotFound = 2,
  InvalidPost = 3,
}

export const responseCodeMap: {
  [key: number]: { readonly code: string; readonly description: string };
} = {
  [ResponseCode.ServerError]: {
    code: 'ERR000',
    description: 'Something went wrong.',
  },
  [ResponseCode.ClientError]: { code: 'ERR001', description: 'Client Error' },
  [ResponseCode.PostNotFound]: {
    code: 'ERR002',
    description: 'Post not found.',
  },
  [ResponseCode.InvalidPost]: {
    code: 'ERR003',
    description: 'Invalid Post. Post is missing Title or Body.',
  },
};
