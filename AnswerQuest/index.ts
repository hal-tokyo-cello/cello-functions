import { conclude, report } from "../library/functional";
import { ApiHandler } from "../library/types";

export type AnswerQuestRequest = {
  answer: string;
};

export interface AnswerQuestResponse {
  correct: boolean;
}

export const run: ApiHandler<AnswerQuestResponse, AnswerQuestRequest> = (context, req) =>
  Promise.resolve({ quest: context.bindingData.quest, req, ...req.body })
    .then(() => ({ correct: true }))
    .then(conclude, report);
