import { ApiHandler, ApiRequest, ApiResponse } from "../types";


export interface QuestSummaryListRequest {
}

export interface QuestSummaryListResponse {
    // quests: Array<Pick<Quest, "title" | "experience"> & {genre: string, clear: boolean}>;
    quests: {title: string, experience: number, genre: string, clear: boolean}[]
}

export type QuestsApiRequest = ApiRequest<QuestSummaryListRequest>;

export type QuestsApiResponse = ApiResponse<QuestSummaryListResponse>;

export type QuestsApi = ApiHandler<QuestSummaryListResponse, QuestSummaryListRequest>;