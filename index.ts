import {Telegraf} from 'telegraf'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'

import { taskTracker } from "./services/taskTracker"
import { bindCommandsOnBot } from './utils/bindCommandsOnBot'
import { callSendedJoinRequests } from './services/callSendedJoinRequests'

const { TOKEN, MONGO } = dotenv.config().parsed
async function databaseStart() {
  try {
    mongoose.connect(MONGO)
  } catch {
    console.error("База данных не запустилась!")
  }
} 
databaseStart()

const bot = new Telegraf(TOKEN)
bindCommandsOnBot(bot)

bot.command('ctx', (ctx) => {
  console.dir(ctx.from)
})
bot.on("message", (ctx) => {
  ctx.telegram.sendMessage(ctx.message.chat.id, "Пожалуйста, введите какую-нибудь команду! Я не понимаю по-другому 😖\nСписок всех команд: /help")
})

setInterval(async () => {
  await callSendedJoinRequests(bot) // not tested shit
}, 1800000) // every 30min

setInterval(async () => {
  await taskTracker(bot)
}, 60000) // every 1min

bot.launch()