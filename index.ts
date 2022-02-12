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
  console.dir(ctx)
})
bot.on("message", (ctx) => {
  ctx.telegram.sendMessage(ctx.message.chat.id, "Пожалуйста, введите какую-нибудь команду! Я не понимаю по-другому 😖\nСписок всех команд: /help")
})

let min = 0

setInterval(async () => {
  min++

  if (!(min % 30)) {
    await callSendedJoinRequests(bot)
    await new Promise(resolve => setTimeout(resolve, 5000))
  }
  console.log(min, "passed" + 1)
  if (!(min % 60)) {
    const hourNow = (new Date(Date.now())).getHours()
    if (hourNow == 18 || hourNow == 7) {
      await scheduleTracker(bot)
    }
    min = 0
    await new Promise(resolve => setTimeout(resolve, 10000))
  }
  console.log(min, "passed" + 2)
  await taskTracker(bot)
}, 60000) // every 1min

bot.launch()