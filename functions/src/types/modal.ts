import {
    AckFn,
    RespondArguments,
    RespondFn,
    SayFn,
} from "@slack/bolt/dist/types/utilities";
import { SlashCommand } from "@slack/bolt/dist/types/command";
import { Context, NextFn } from "@slack/bolt/dist/types/middleware";
import { App } from "@slack/bolt";

export interface modalArgs {
    payload?: SlashCommand;
    trigger_id: string;
    private_metadata?: string;
    say?: SayFn;
    respond?: RespondFn;
    ack?: AckFn<string | RespondArguments>;
    context: Context;
    app: App;
    next?: NextFn;
}

export interface userDoc {
    slack_id: string;
    group_list: Array<string>
}
