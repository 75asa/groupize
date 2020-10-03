import * as functions from "firebase-functions";
import { App, ExpressReceiver } from "@slack/bolt";
import { useMokumokuCommand } from "./commands/mokumoku";
import { groupize } from "./commands/groupize";
import { useGroupizeNewCommand } from "./commands/groupize-new";

const config = functions.config();

export const expressReceiver = new ExpressReceiver({
  signingSecret: config.slack.secret,
  endpoints: "/events",
  processBeforeResponse: true,
});

const app = new App({
  receiver: expressReceiver,
  token: config.slack.token,
});

useMokumokuCommand(app);

groupize(app);
useGroupizeNewCommand(app);
