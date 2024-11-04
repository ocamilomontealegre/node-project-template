import { HTTP_MESSAGES } from "@common/constants/http-messages.constant";

export class HTTPUtils {
  public static getHttpMessage = (statusCode: number): string => {
    return HTTP_MESSAGES[statusCode] ?? "Unknown status code";
  };
}
