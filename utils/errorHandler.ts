import type { AppError, ErrorType } from "@/types/error";
import { HttpRedirectResponse, IonicIconType } from "@/types/globals";
import { AxiosError } from "axios";
import { router } from "expo-router";

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
          "Unable to connect to the server. Please check your internet connection and try again.",
        retryable: true,
      };
    }

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as HttpRedirectResponse | undefined;
      switch (status) {
        case 307:
          if (data?.redirectTo) {
            router.push({
              pathname: data.redirectTo,
              params: {
                message: data.message,
                payload: JSON.stringify(data.payload),
              },
            });
          }
          return {
            type: "REDIRECT_ERROR",
            message: data?.message || "Redirection required",
            details: "You are being redirected.",
            statusCode: 307,
            retryable: false,
          };

        case 400:
          return this.handleBadRequestError(data);

        case 401:
          return {
            type: "AUTHENTICATION_ERROR",
            message: "Authentication failed",
            details: data?.message || "Please log in to continue.",
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
            type: "CLIENT_ERROR",
            message: "Resource not found",
            details:
              data?.message || "The requested resource could not be found.",
            statusCode: 404,
            retryable: false,
          };

        case 409:
          return {
            type: "VALIDATION_ERROR",
            message: "Conflict",
            details:
              data?.message || "This action conflicts with existing data.",
            statusCode: 409,
            retryable: false,
          };

        case 429:
          return {
            type: "RATE_LIMIT_ERROR",
            message: "Too many requests",
            details:
              "You've made too many requests. Please wait a moment and try again.",
            statusCode: 429,
            retryable: true,
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
            retryable: status >= 500,
          };
      }
    }

    // no response
    return {
      type: "NETWORK_ERROR",
      message: "No response from server",
      details: "The server is not responding. Please try again later.",
      retryable: true,
    };
  }

  private static handleBadRequestError(data: any): AppError {
    if (Array.isArray(data.message)) {
      const messages = data.message;
      const primaryMessage = messages[0] || "Invalid input";
      const allMessages = messages.join(" • ");
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

  static getErrorIcon(errorType: ErrorType): IonicIconType {
    switch (errorType) {
      case "NETWORK_ERROR":
        return "wifi";
      case "SERVER_ERROR":
        return "server-outline";
      case "VALIDATION_ERROR":
        return "warning";
      case "AUTHENTICATION_ERROR":
        return "lock-closed";
      case "TIMEOUT_ERROR":
        return "time-outline";
      case "RATE_LIMIT_ERROR":
        return "hourglass";
      case "CLIENT_ERROR":
        return "file-tray";
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
      case "RATE_LIMIT_ERROR":
        return "#F59E0B";
      case "CLIENT_ERROR":
        return "#6B7280";
      default:
        return "#EF4444";
    }
  }
}
