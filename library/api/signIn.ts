import { ApiHandler, ApiRequest, ApiResponse } from "../types";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  succeed: boolean;
}

export type SignInApiRequest = ApiRequest<SignInRequest>;

export type SignInApiResponse = ApiResponse<SignInResponse>;

export type SignInApi = ApiHandler<SignInResponse, SignInRequest>;
