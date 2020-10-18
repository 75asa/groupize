import { App } from "@slack/bolt";
// import * as groupizeNew from "./groupize-new";
import { useGroupizeNewCommand } from "./groupize-new";
import { SystemConst } from "../../const";
import * as globalModal from "../blocks/global-modal";

export const groupize = (app: App) => {
  // menu
  app.command(SystemConst.GroupizeInit.COMMAND_NAME, async ({ ack, body, context }) => {
    await ack();
    try {
      await app.client.views.open(globalModal.getView({ context, body }));
    } catch (error) {
      console.error({ error });
    }
  });

  // submit action
  app.view(
    SystemConst.GroupizeInit.VIEW_ID,
    async ({ ack, view }) => {
      await ack();
      const values = view.state.values;
      console.log("values", JSON.stringify(values, null, 4));
      const selectedValue =
        values.groupize_menu.groupize_menu_action.selected_option.value;

      switch (selectedValue) {
        case SystemConst.GroupizeInit.MenuValues.NEW:
          useGroupizeNewCommand(app);
          break;
        case SystemConst.GroupizeInit.MenuValues.CALL:
          break;
        case SystemConst.GroupizeInit.MenuValues.LIST:
          break;
        default:
          break;
      }

      console.log({ values });
    }
  );
};
