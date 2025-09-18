import { RelativePathString } from "expo-router";

export interface HttpRedirectResponse {
  message: string;
  redirectTo: RelativePathString;
  payload: Record<string, any>;
}
