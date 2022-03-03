import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import * as fs from "fs/promises"
import * as path from "path"
import dateStringify from "../utils/dateStringify";
import { userModel } from "../models/users";
import { ALLOWED_ROLES } from "../utils/constants";

export default async function scheduleTracker(bot: Telegraf<Context<Update>>): Promise<void> {
  const schedulesFile: Buffer = await fs.readFile(__dirname + path.sep + path.join( "..", "schedule", "parsedSchedules.json"))
  let prefix: string = "Доброе утро! Расписание на сегодня:\n\n", // 0 - morning, 1 - evening
      suffix: string = "\nХорошего учебного дня!"
  const timeNow: Date = new Date(Date.now())
  if (timeNow.getUTCHours() >= 15) {
    timeNow.setDate(timeNow.getDate() + 1)
    prefix = "Добрый вечер! Расписание на завтра:\n\n"
    suffix = "\n\nХорошего отдыха перед тяжелым учебным днём! 😌"
  }
  const todayQuery: string = dateStringify(timeNow)
  const scheduleToday: object = JSON.parse(schedulesFile.toString())[todayQuery]
  if (!scheduleToday) return
  const groupNames = Object.getOwnPropertyNames(scheduleToday)
  let i = 1
  for (let groupName of groupNames) {
    const users = await userModel.find({groupName, role: ALLOWED_ROLES, subscribe: true})
    if (!users.length) continue
    const message: string = prefix + scheduleToMessage(scheduleToday[groupName]) + suffix
    for (let user of users) {
      bot.telegram.sendMessage(user.uid, message)
      if (i++ >= 24) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        i = 1
      }
    }
  }
}

export function scheduleToMessage(schedule: object):string {
  const PRIORITY_LIST = [
    '8:30-10:10', 
    '8:30-12:00', '8:30-12:00A', '8:30-12:00B', 
    '10:20-12:00', 
    '10:20-14:00','10:20-14:00A','10:20-14:00B', 
    '12:20-14:00', 
    '12:20-15:50','12:20-15:50A','12:20-15:50B', 
    '14:10-15:50', 
    '14:10-17:40', '14:10-17:40A', '14:10-17:40B', 
    '16:00-17:40', 
    '16:00-19:30', '16:00-19:30A', '16:00-19:30B', 
    '18:00-19:30', 
    '18:00-21:10', '18:00-21:10A', '18:00-21:10B',
    '19:40-21:10', 
    '19:40-22:50', '19:40-22:50A', '19:40-22:50B',
    '21:20-22:50']
  let result: string = ""
  for (let time of PRIORITY_LIST) {
    if (!schedule[time]) continue
    let temptime = time
    if (time[time.length - 1] != '0') temptime = time.slice(0, time.length - 1)
    result += temptime + " — " + schedule[time] + "\n"
  }
  return result
}