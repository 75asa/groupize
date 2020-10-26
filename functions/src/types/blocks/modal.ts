import { Context } from "@slack/bolt/dist/types/middleware";
import { SlashCommand } from "@slack/bolt/dist/types/"
import { App } from "@slack/bolt";

export interface ModalView {
  context: Context;
  app?: App;
  body?: SlashCommand;
  trigger_id?: string;
  channel_id?: string;
  isUpdated?: boolean;
}
