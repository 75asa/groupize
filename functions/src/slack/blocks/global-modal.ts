import { SystemConst } from "../../const";
import { View } from "../../types/blocks/modal";
import { ViewsOpenArguments } from "@slack/web-api/dist/methods";

export const getView = ({ context, body }: View): ViewsOpenArguments => {
  return {
    token: context.botToken,
    trigger_id: body ? body.trigger_id as string : '',
    view: {
      title: {
        type: "plain_text",
        text: "groupize :spinthinking: ",
        emoji: true,
      },
      submit: {
        type: "plain_text",
        text: "Submit",
        emoji: true,
      },
      type: "modal",
      callback_id: SystemConst.GroupizeInit.VIEW_ID,
      close: {
        type: "plain_text",
        text: "Cancel",
        emoji: true,
      },
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "What u wanna action by groupize ?? :ghost: ",
          },
        },
        {
          type: "divider",
        },
        {
          type: "input",
          block_id: "groupize_menu",
          element: {
            type: "radio_buttons",
            action_id: "groupize_menu_action",
            initial_option: {
              text: {
                type: "plain_text",
                text: "groupize new :new: ",
                emoji: true,
              },
              value: SystemConst.GroupizeInit.MenuValues.NEW,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "groupize new :new: ",
                  emoji: true,
                },
                value: SystemConst.GroupizeInit.MenuValues.NEW,
              },
              {
                text: {
                  type: "plain_text",
                  text: "groupize call :call_me_hand::skin-tone-5: ",
                  emoji: true,
                },
                value: SystemConst.GroupizeInit.MenuValues.CALL,
              },
              {
                text: {
                  type: "plain_text",
                  text: "groupize list :books: ",
                  emoji: true,
                },
                value: SystemConst.GroupizeInit.MenuValues.LIST,
              },
            ],
          },
          label: {
            type: "plain_text",
            text: "Label",
            emoji: true,
          },
        },
      ],
    },
  };
};
