import { Context, HttpRequest, HttpResponse } from "@azure/functions";

export interface User {
  accountId: string;
  name: string;
  email: string;
  avatar?: Avatar;
  createDate?: number;
  updateDate?: number;
  leaveDate?: number;
  lastLogin?: number;
}

export interface Avatar {
  race: number;
  level: number;
  levelMax: number;
  totalExp: number;
  evolved: boolean;
  iconUrl?: string;
  imageUrl?: string;
}

export interface UserCredential {
  email: string;
  password: string;
}

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
