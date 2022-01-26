import {Telegraf} from 'telegraf'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'

import { commands } from './commands/commands'
import { taskTracker } from "./services/taskTracker"

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

bot.command('start', commands.start)
bot.command('help', commands.help)
bot.command('groups_list', commands.groupsList)
bot.command('add_task', commands.addTask)
bot.command('add_group', commands.addGroup)
bot.command('ctx', (ctx) => {
  console.dir(ctx.from)
})

bot.on("message", (ctx) => {
  ctx.telegram.sendMessage(ctx.message.chat.id, "Пожалуйста, введите какую-нибудь команду! Я не понимаю по-другому 😖\nСписок всех команд: /help")
})

setInterval(async () => {
  await taskTracker(bot)
}, 60000)

bot.launch()