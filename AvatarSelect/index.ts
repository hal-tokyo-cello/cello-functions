import { PlayerUpgradeOption } from "cello-core/core";
import { AvatarSelectApi } from "../library/api/avatarSelect";
import { AccountRepository } from "../library/db/mongodb";

const httpTrigger: AvatarSelectApi = async (context, req) => {
  let succeed = true;
  let error = "";
  try {
    const id = req.body.id;
    const race = req.body.race;

    const repo = new AccountRepository();

    const option = new PlayerUpgradeOption(race, 0);

    await (await repo.getUser(id)).upgradeToPlayer(option);
  } catch (e) {
    // if(e instanceof エラー名){}
    succeed = false;
    error = "avatar not selected";
  }

  return {
    body: {
      succeed: succeed,
      error: error,
    },
  };
};

export default httpTrigger;
