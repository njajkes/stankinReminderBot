import { taskModel } from "../models/tasks";
import { parseCallbackQuery } from "../utils/parseCallbackQuery";
import { Action } from "./action";

function reschedule(m: number) {
  return async function(ctx) {
    const {taskID, message} = parseCallbackQuery(ctx)
    const task = await taskModel.findById(taskID)
    task.time = Date.now() + m*60*1000
    task.status = "waiting"
    await task.save()
    let msg: string;
    switch(m) {
      case 5:
      case 10:
      case 15:
      case 30:
      case 45:
        msg = `${m} минут`
        break
      case 60:
        msg = `1 час`
      case 3*60:
      case 24*60:
        msg = `${m%60} часа`
        break
      case 6*60:
      case 12*60:
        msg = `${m%60} часов`
        break
      default:
        msg = "undefined"
    } 

    ctx.editMessageText(message.text + `\n\nЗадача была отложена на ${msg} :)`)  
  }
}

const reschedule5min = reschedule(5)
const Reschedule5min = new Action(reschedule5min, "RESCH_5MIN_ACTION")

const reschedule10min = reschedule(10) 
const Reschedule10min = new Action(reschedule10min, "RESCH_10MIN_ACTION")

const reschedule15min = reschedule(15)
const Reschedule15min = new Action(reschedule15min, "RESCH_15MIN_ACTION")

const reschedule30min = reschedule(30)
const Reschedule30min = new Action(reschedule30min, "RESCH_30MIN_ACTION")

const reschedule1h = reschedule(60)
const Reschedule1h = new Action(reschedule1h, "RESCH_1H_ACTION")

const reschedule3h = reschedule(60*3)
const Reschedule3h = new Action(reschedule3h, "RESCH_3H_ACTION")

const reschedule6h = reschedule(60*6)
const Reschedule6h = new Action(reschedule6h, "RESCH_6H_ACTION")

const reschedule12h = reschedule(60*12)
const Reschedule12h = new Action(reschedule12h, "RESCH_12H_ACTION")

const reschedule24h = reschedule(60*24)
const Reschedule24h = new Action(reschedule24h, "RESCH_24H_ACTION")

export const Reschedules: Action[] = [Reschedule5min, Reschedule10min, Reschedule15min, Reschedule30min, Reschedule1h, Reschedule3h, Reschedule6h, Reschedule12h, Reschedule24h]