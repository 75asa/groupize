import { App } from "@slack/bolt";
import * as db from "../../db/putGroup";
import { SystemConst } from "../../const";
import * as newModal from "../blocks/new-modal";
import { ModalView } from "../../types/blocks/modal";

export const tryOpenModal = async ({ app, trigger_id, context, isUpdated }: ModalView) => {
  try {
    if (app === undefined) {
      new Error("hoge");
    } else if (isUpdated) {
      await app.client.views.push(newModal.getView({ context, trigger_id }));
    } else {
      await app.client.views.open(newModal.getView({ context, trigger_id }));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * modal response を受け取る
 * @param app - App
 */
export const catchModalResponse = async (app: App) => {
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

    console.log({ res });
  });
};

/**
 * slash command から呼び出される groupize-new
 * @param app - App
 */
export const useGroupizeNewCommand = (app: App) => {
  app.command(
    SystemConst.GroupizeNew.COMMAND_NAME,
    async ({ ack, body, context, command }) => {
      await ack();
      tryOpenModal({
        app,
        trigger_id: body.trigger_id,
        context,
        channel_id: command.channel_id,
      });
    }
  );
  catchModalResponse(app);
};
