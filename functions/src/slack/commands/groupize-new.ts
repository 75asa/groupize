import { App } from "@slack/bolt";
import { modalArgs } from "../../types/common";
import * as db from "../../db/putGroup"

const VIEW_ID = "dialog_3";

const openModal = async ({ app, trigger_id, context }: modalArgs) => {
  await app.client.views.open({
    token: context.botToken,
    trigger_id,
    view: {
      type: "modal",
      callback_id: VIEW_ID,
      title: {
        type: "plain_text",
        text: "groupize new",
      },
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "enter group name, select users",
          },
        },
        {
          type: "divider",
        },
        {
          type: "input",
          block_id: "group_name",
          element: {
            action_id: "group_name_action",
            type: "plain_text_input",
          },
          label: {
            type: "plain_text",
            text: "Group name",
            emoji: true,
          },
        },
        {
          type: "input",
          block_id: "group_users",
          element: {
            type: "multi_users_select",
            action_id: "multi_users_select_action",
            placeholder: {
              type: "plain_text",
              text: "Select users :woman-boy: ",
              emoji: true,
            },
          },
          label: {
            type: "plain_text",
            text: "Group users",
            emoji: true,
          },
        },
      ],
      submit: {
        type: "plain_text",
        text: "Register",
      },
      close: {
        type: "plain_text",
        text: "Cancel",
        emoji: true,
      },
    },
  });
};

export const useGroupizeNewCommand = (app: App) => {
  app.command("/groupize-new", async ({ ack, body, context, command }) => {
    await ack();
    try {
      await openModal({
        app,
        trigger_id: body.trigger_id,
        context,
        private_metadata: command.channel_id,
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.view(VIEW_ID, async ({ ack, view, context, body }) => {
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
