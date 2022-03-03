import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { actions } from "../actions/actions";
import { commands } from "../commands/commands";

export default function bindCommandsOnBot(bot:Telegraf<Context<Update>>) {
  commands.forEach(el => {
    bot.command(el.name, el.func)
  })
  actions.forEach(el => {
    bot.action(el.name, el.func)
  })
}