import { ApiHandler, ApiRequest, ApiResponse } from "../types";

export interface AvatarSelectRequest {
  id: string;
  race: number;
}

export interface AvatarSelectResponse {
  succeed: boolean;
  error: string;
}

export type AvatarSelectApiRequest = ApiRequest<AvatarSelectRequest>;

export type AvatarSelectApiResponse = ApiResponse<AvatarSelectResponse>;

export type AvatarSelectApi = ApiHandler<AvatarSelectResponse, AvatarSelectRequest>;
