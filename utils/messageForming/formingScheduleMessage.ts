import { scheduleToMessage } from "../../services/scheduleTracker"
import dateStringify from "../dateStringify"
import * as fs from "fs/promises"
import * as path from "path"

export default async function formingScheludeMessage({ groupName, n }: { groupName: string; n?: number  }): Promise<string> {
  let result: string = ""
  let days: string[] = []
  const timeNow = new Date(Date.now())
  const msDay = 1000*60*60*24
  if (n) {
    result = `Расписание группы ${groupName} с ${dateStringifyToRusLocale(timeNow)} по ${dateStringifyToRusLocale(new Date(timeNow.getTime() + n * msDay))}\n`
    for (let i = 0; i < n; i++) {
      days.push(dateStringify(new Date(timeNow.getTime()+i*msDay)))
    }
  } else {
    result = `Расписание группы ${groupName} на сегодня:\n`
    days.push(dateStringify(timeNow))
  }

  const schedulesFile: Buffer = await fs.readFile(__dirname + path.sep + path.join( "..", "schedule", "parsedSchedules.json"))
  const schedules = JSON.parse(schedulesFile.toString())

  for (let day of days) {
    if (!schedules[day] || !schedules[day][groupName]) result += `\n${dateStringifyToRusLocale(new Date(day))}:\nПар нет\n`
    else result += `\n${dateStringifyToRusLocale(new Date(day))}:\n${scheduleToMessage(schedules[day][groupName]).split('\n').map(e => "    " + e).join('\n')}\n`
  }
  return result
}

function dateStringifyToRusLocale(n: Date) {
  let tmp = dateStringify(n).split(' ');
  [tmp[0], tmp[2]] = [tmp[2], tmp[0]];
  return tmp.join('/')
}