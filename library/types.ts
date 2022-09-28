import { Context, HttpRequest, HttpResponse } from "@azure/functions";

export interface ErrorResponse {
  error: {
    code: number;
    message: string;
    errors: Error[];
  };
}

export interface Error {
  message: string;
  reason: string;
}
export interface ApiRequest<T = {}> extends Omit<HttpRequest, "body"> {
  body: T;
}

export interface ApiResponse<T = {}> extends Omit<HttpResponse, "body"> {
  body: T;
}

export type ApiError = ApiResponse<ErrorResponse>;

export type ApiHandler<res = {}, req = {}> = (
  context: Context,
  req: ApiRequest<req>
) => Promise<ApiResponse<res | ErrorResponse>>;
