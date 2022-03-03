import * as fs from "fs/promises"
import {sep} from "path"
import { comDesc } from "../comDesc"
import { command } from "../command"

async function devSendLogs(ctx) {
  if (ctx.from.id != 298712159) {
    ctx.telegram.sendMessage(ctx.from.id, "PERM ERR")
  }
  let query: string | undefined = ctx.message.text.split(' ')[1]
  let result: string = ''
  if (!query || isNaN(+query)) query = '7' 
  const a = await fs.readFile(`${__dirname}${sep}..${sep}..${sep}logs${sep}logs.log`)
  const tmp = a.toString().split('\n')
  for (let i = +query; i > 2; i--) {
    result += `${tmp[tmp.length - i]}\n`
  }
  ctx.telegram.sendMessage(ctx.from.id, result)
}

const devSendLogsDescription = new comDesc("/__dev_send_logs", "выводит логи", 99)
export const DevSendLogs = new command(devSendLogs, "__dev_send_logs", devSendLogsDescription)