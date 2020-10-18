import { App } from "@slack/bolt";
import { modalArgs } from "../../types/common";
import * as db from "../../db/putGroup"
import { SystemConst } from "../../const";
import * as newModal from "../blocks/new-modal"

export const openRegisterModal = async ({ app, trigger_id, context }: modalArgs) => {
  await app.client.views.open(newModal.getView({ context, trigger_id }));
};

export const useGroupizeNewCommand = (app: App) => {
  app.command(SystemConst.GroupizeNew.COMMAND_NAME, async ({ ack, body, context, command }) => {
    await ack();
    try {
      await openRegisterModal({
        app,
        trigger_id: body.trigger_id,
        context,
        private_metadata: command.channel_id,
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.view(SystemConst.GroupizeNew.VIEW_ID, async ({ ack, view }) => {
    await ack();
    const channelId = view.private_metadata;
    const values = view.state.values;
    console.log("values", JSON.stringify(values, null, 4));
    console.log({ values, channelId });
    const groupName = values.group_name.group_name_action.value;
    const groupUsers =
      values.group_users.multi_users_select_action.selected_users;

    console.log({ groupName, groupUsers });

    const res = await db.putGroup(groupName, groupUsers);

    console.log({ res })

  });
};
