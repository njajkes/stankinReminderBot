import { Context, Telegraf } from "telegraf"
import { Update } from "telegraf/typings/core/types/typegram"
import logger from "../logs/logger"

export default async function debug(bot:Telegraf<Context<Update>>) {
  bot.use(async (ctx, next) => {
    await logger(ctx)
    next()
  })
  bot.command('ctx', (ctx) => {
    console.dir(ctx)
    ctx.state.a = 123
    ctx.telegram.sendMessage(ctx.message.chat.id, "xd", {
      reply_markup: {inline_keyboard: [
        [{text: "asd", callback_data: 'XD'}]
      ]}
    })
  })
  bot.action("XD", ctx => console.dir(ctx))
}