
export interface ApiResponse {
  code: HttpStatus;
  msg?: string;
  data?: any;
}

// HTTP status codes.
export enum HttpStatus {
  Ok = 200,
  Moved = 301,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500,
  NotImplemented = 501,
  ServiceUnavailable = 503
}
