import { App } from "@slack/bolt";

const VIEW_ID = "dialog_2";
const GROUPIZE_INIT_MENU_VALUE = {
  NEW: "1",
  CALL: "2",
  LIST: "3",
};

export const groupize = (app: App) => {
  // menu
  app.command("/groupize", async ({ ack, body, context, command }) => {
    await ack();
    try {
      await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
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
          callback_id: VIEW_ID,
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
                  value: GROUPIZE_INIT_MENU_VALUE.NEW,
                },
                options: [
                  {
                    text: {
                      type: "plain_text",
                      text: "groupize new :new: ",
                      emoji: true,
                    },
                    value: GROUPIZE_INIT_MENU_VALUE.NEW,
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "groupize call :call_me_hand::skin-tone-5: ",
                      emoji: true,
                    },
                    value: GROUPIZE_INIT_MENU_VALUE.CALL,
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "groupize list :books: ",
                      emoji: true,
                    },
                    value: GROUPIZE_INIT_MENU_VALUE.LIST,
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
      });
    } catch (error) {
      console.error({ error });
    }
  });

  // submit action
  app.view(VIEW_ID, async ({ ack, view, context, body }) => {
    await ack();
    const values = view.state.values;
    console.log("values", JSON.stringify(values, null, 4));
    const selectedValue =
      values.groupize_menu.groupize_menu_action.selected_option.value;

    switch (selectedValue) {
      case GROUPIZE_INIT_MENU_VALUE.NEW:
        break;
      case GROUPIZE_INIT_MENU_VALUE.CALL:
        break;
      case GROUPIZE_INIT_MENU_VALUE.LIST:
        break;
      default:
        break;
    }

    console.log({ values });
  });
};
