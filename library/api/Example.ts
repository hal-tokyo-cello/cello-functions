import { ApiHandler, ApiRequest, ApiResponse } from "../types";

export interface ExampleRequest {
  name: string;
}

export interface ExampleResponse {
  message: string;
  echo: string;
}

export type ExampleApiRequest = ApiRequest<ExampleRequest>;

export type ExampleApiResponse = ApiResponse<ExampleResponse>;

export type ExampleApi = ApiHandler<ExampleResponse, ExampleRequest>;
