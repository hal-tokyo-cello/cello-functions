import { isApiError } from "./test";
import { ApiError, ApiResponse, Error } from "./types";

export const catch404 = (...error: Error[]) =>
  isApiError(error?.[0])
    ? Promise.reject(error)
    : Promise.reject({
        body: {
          error: {
            code: 404,
            errors: error,
            message: "invalid request",
          },
        },
        statusCode: 404,
      });

export const catch500 = (...error: Error[]) =>
  isApiError(error?.[0])
    ? Promise.reject(error)
    : Promise.reject({
        body: {
          error: {
            code: 500,
            errors: error,
            message: "server error",
          },
        },
        statusCode: 500,
      });

export const conclude = <T>(res: T): ApiResponse<T> => ({ body: res });

export const report = (res: ApiError): ApiError => res;
