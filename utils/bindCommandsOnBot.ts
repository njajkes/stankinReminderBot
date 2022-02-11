import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { commands } from "../commands/commands";

export default async function bindCommandsOnBot(bot:Telegraf<Context<Update>>) {
  commands.forEach(el => {
    bot.command(el.name, el.func)
  })
}