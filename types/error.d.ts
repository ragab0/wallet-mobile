export type ErrorType =
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "VALIDATION_ERROR"
  | "AUTHENTICATION_ERROR"
  | "TIMEOUT_ERROR"
  | "UNKNOWN_ERROR"
  | "REDIRECT_ERROR"
  | "RATE_LIMIT_ERROR"
  | "CLIENT_ERROR";

export interface AppError {
  type: ErrorType;
  message: string;
  details: string;
  statusCode?: number;
  retryable?: boolean;
}

export interface FailedError {
  resolve: (token: string) => void;
  reject: (error: AppError) => void;
}
