import {Telegraf} from 'telegraf'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'

import taskTracker from "./services/taskTracker"
import bindCommandsOnBot from './utils/bindCommandsOnBot'
import callSendedJoinRequests from './services/callSendedJoinRequests'
import scheduleTracker from './services/scheduleTracker'

const { TOKEN, MONGO } = dotenv.config().parsed
async function databaseStart() {
  try {
    await mongoose.connect(MONGO)
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
  await callSendedJoinRequests(bot)
}, 1800000) // every 30min

setInterval(async () => {
  const hourNow = (new Date(Date.now())).getHours()
  if (hourNow == 18 || hourNow == 6) {
    await new Promise(resolve => setTimeout(resolve, 1200))
    await scheduleTracker(bot)
  }
}, 3600000) // every 1hour

setInterval(async () => {
  await taskTracker(bot)
}, 60000) // every 1min

bot.launch()