import { db } from "../library/db";
import { catch404, catch500, conclude, report } from "../library/functional";
import { ApiHandler } from "../library/types";

export interface SelectAvatarRequest {
  race: number;
}

export type SelectAvatarResponse = {};

export const run: ApiHandler<SelectAvatarResponse, SelectAvatarRequest> = (context, req) =>
  Promise.resolve({ user: context.bindingData.user, ...req.body })
    .then(async ({ race, user }) => ({ race, user: await db.getUser(user) }))
    .then(({ race, user }) => user.upgradeToPlayer({ race }), catch404)
    .then(() => ({}), catch500)
    .then(conclude, report);
