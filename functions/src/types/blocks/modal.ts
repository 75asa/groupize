import { Context } from "@slack/bolt/dist/types/middleware";
import { SlashCommand } from "@slack/bolt/dist/types/"

export interface View {
  context: Context;
  body?: SlashCommand;
  trigger_id?: string;
}
