import type { AppError, ErrorType } from "@/types/error";
import { AxiosError } from "axios";

/* NO NEED TO CHECK NETWORK CONNECTIVITY FIRST */
/* JUST HANDLING AXIOS ERRORS */

export class ErrorHandler {
  static async handleError(error: AxiosError): Promise<AppError> {
    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      return {
        type: "TIMEOUT_ERROR",
        message: "Request timed out",
        details: "The request is taking too long. Please try again.",
        retryable: true,
      };
    }

    if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
      return {
        type: "NETWORK_ERROR",
        message: "Connection failed",
        details:
          "Unable to connect. Please check your connection and try again.",
        retryable: true,
      };
    }

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          return this.handleBadRequestError(data);

        case 401:
          return {
            type: "AUTHENTICATION_ERROR",
            message: "Session expired",
            details: "Your session has expired. Please sign in again.",
            statusCode: 401,
            retryable: false,
          };

        case 403:
          return {
            type: "AUTHENTICATION_ERROR",
            message: "Access denied",
            details: "You do not have permission to access this resource.",
            statusCode: 403,
            retryable: false,
          };

        case 404:
          return {
            type: "SERVER_ERROR",
            message: "Service unavailable",
            details: "The requested service could not be found.",
            statusCode: status,
            retryable: false,
          };

        case 500:
        case 502:
        case 503:
        case 504:
          return {
            type: "SERVER_ERROR",
            message: "Server temporarily unavailable",
            details:
              "We are experiencing technical difficulties. Please try again in a moment.",
            statusCode: status,
            retryable: true,
          };

        default:
          return {
            type: "UNKNOWN_ERROR",
            message: "Something went wrong",
            details: "An unexpected error occurred. Please try again.",
            statusCode: status,
            retryable: true,
          };
      }
    }

    // no response
    return {
      type: "UNKNOWN_ERROR",
      message: error.message || "Something went wrong",
      details: "An unexpected error occurred. Please try again.",
      retryable: true,
    };
  }

  private static handleBadRequestError(data: any): AppError {
    if (Array.isArray(data.message)) {
      const messages = data.message;
      const primaryMessage = messages[0] || "Invalid input";
      const allMessages = messages.join(" - ");
      return {
        type: "VALIDATION_ERROR",
        message: primaryMessage,
        details: messages.length > 1 ? allMessages : undefined,
        statusCode: 400,
        retryable: false,
      };
    } else if (typeof data.message === "string") {
      return {
        type: "VALIDATION_ERROR",
        message: data.message,
        details: "Please check your information and try again.",
        statusCode: 400,
        retryable: false,
      };
    } else
      return {
        type: "VALIDATION_ERROR",
        message: "Invalid input",
        details: "Please check your information and try again.",
        statusCode: 400,
        retryable: false,
      };
  }

  static getErrorIcon(errorType: ErrorType): string {
    switch (errorType) {
      case "NETWORK_ERROR":
        return "wifi-off";
      case "SERVER_ERROR":
        return "server-outline";
      case "VALIDATION_ERROR":
        return "warning";
      case "AUTHENTICATION_ERROR":
        return "lock-closed";
      case "TIMEOUT_ERROR":
        return "time-outline";
      default:
        return "alert-circle";
    }
  }

  static getErrorColor(errorType: ErrorType): string {
    switch (errorType) {
      case "NETWORK_ERROR":
        return "#F59E0B";
      case "SERVER_ERROR":
        return "#DC2626";
      case "VALIDATION_ERROR":
        return "#EF4444";
      case "AUTHENTICATION_ERROR":
        return "#EF4444";
      case "TIMEOUT_ERROR":
        return "#8B5CF6";
      default:
        return "#EF4444";
    }
  }
}
