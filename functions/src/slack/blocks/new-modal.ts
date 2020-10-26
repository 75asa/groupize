import { SystemConst } from "../../const";
import { ModalView } from "../../types/blocks/modal";
import { ViewsOpenArguments } from "@slack/web-api/dist/methods";

export const getView = ({ context, trigger_id }: ModalView): ViewsOpenArguments => {
  return {
    token: context.botToken,
    trigger_id: trigger_id as string,
    view: {
      type: "modal",
      callback_id: SystemConst.GroupizeNew.VIEW_ID,
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
  };
};
