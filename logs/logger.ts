import * as fs from "fs/promises"
import {sep} from "path"
import { timeToString } from "../utils/timeToString"

export default async function logger(ctx) {
  const date = new Date()
  const dateMsg = `[${timeToString(date.getTime())}:${date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()}]`
  const sender = ctx.update.callback_query ? `${ctx.update.callback_query.from.username} (id: ${ctx.update.callback_query.from.id})` : `${ctx.from.username} (${ctx.from.id})`

  const updateType = ctx.update.callback_query ? `callback_query` : `message`
  const data = ctx.update.callback_query ? ctx.update.callback_query.data : `"${ctx.message.text}"`

  const log = `\n${dateMsg} ${sender} ${updateType}: ${data}`
  await fs.appendFile(__dirname + sep + "logs.log", log)  
}