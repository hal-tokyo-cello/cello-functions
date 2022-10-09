import { conclude, report } from "../library/functional";
import { ApiHandler } from "../library/types";

export interface GetAvatarOptionsRequest {}

export interface GetAvatarOptionsResponse {
  options: typeof raceOptions;
}

const raceOptions = [
  {
    id: 1,
    display: "パンケーキ",
    image: "https://cdn.cellolearn.net/images/6e159da83817833a95e8e904ad41eb48.png",
  },
  {
    id: 2,
    display: "ドラゴン",
    image: "https://cdn.cellolearn.net/images/6a74825f1eabf2152acb3912806b350b.png",
  },
];

export const run: ApiHandler<GetAvatarOptionsResponse, GetAvatarOptionsRequest> = (context, req) =>
  Promise.resolve({ options: raceOptions }).then(conclude, report);

export default run;
