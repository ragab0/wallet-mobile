export type ErrorType =
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "VALIDATION_ERROR"
  | "AUTHENTICATION_ERROR"
  | "TIMEOUT_ERROR"
  | "UNKNOWN_ERROR";

export interface AppError {
  type: ErrorType;
  message: string;
  details: string;
  statusCode?: number;
  retryable?: boolean;
}
