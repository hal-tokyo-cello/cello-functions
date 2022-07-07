import { ApiHandler, ApiRequest, ApiResponse } from "../types";

export interface SignInRequest {
  name: string;
}

export interface SignInResponse {
  message: string;
  echo: string;
}

export type SignInApiRequest = ApiRequest<SignInRequest>;

export type SignInApiResponse = ApiResponse<SignInResponse>;

export type SignInApi = ApiHandler<SignInResponse, SignInRequest>;
