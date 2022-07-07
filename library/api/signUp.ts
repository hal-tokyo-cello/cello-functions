import { ApiHandler, ApiRequest, ApiResponse } from "../types";

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  message: string;
  echo: string;
}

export type SignUpApiRequest = ApiRequest<SignUpRequest>;

export type SignUpApiResponse = ApiResponse<SignUpResponse>;

export type SignUpApi = ApiHandler<SignUpResponse, SignUpRequest>;
