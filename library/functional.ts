import { isApiError } from "./test";
import { ApiError, ApiResponse, Error } from "./types";

const ErrorBind: (code: number, message: string) => (source: Error[] | ApiError) => Promise<never> =
  (code, message) => (source) =>
    isApiError(source)
      ? Promise.reject(source)
      : Promise.reject({
          body: {
            error: {
              code: code,
              errors: source,
              message: message,
            },
          },
          statusCode: code,
        });

export const catch404 = ErrorBind(404, "invalid request");

export const catch500 = ErrorBind(500, "server error");

export const conclude = <T>(res: T): ApiResponse<T> => ({ body: res });

export const report = (res: ApiError): ApiError => res;
