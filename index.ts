import {Telegraf} from 'telegraf'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'

import { commands } from './commands/commands'
import { taskModel } from './models/tasks'
import { findPendingTasks } from './controllers/tasks'

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
bot.command('ctx', (ctx) => {
  console.dir(ctx)
})
bot.on("message", (ctx) => {
  ctx.telegram.sendMessage(ctx.message.chat.id, "Пожалуйста, введите какую-нибудь команду! Я не понимаю по-другому 😖\nСписок всех команд: /help")
})

setInterval( async () => {
  const tasks = await findPendingTasks(Date.now())
  tasks.forEach( async task => {
    bot.telegram.sendMessage(task.uid, `Предмет: ${task.discipline}\nОписание: ${task.description}`)
    task.status = 'pending'
    await task.save()
  } )
}, 60000)

bot.launch()