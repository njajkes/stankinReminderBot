import formingScheludeMessage from "../utils/formingScheduleMessage"
import { SCHEDULE_EDIT_DEFAULT } from "../utils/markups"
import { parseCallbackQuery } from "../utils/parseCallbackQuery"
import { Action } from "./action"
import { cloneDeep, isEqual } from "lodash"

function scheduleChange(n?: number) {
  return async function (ctx) {
    const {message} = parseCallbackQuery(ctx)
    const groupName = message.text.split(' ')[2]
    const result = await formingScheludeMessage({groupName, n})
    
    if (message.text == result) return

    const newMarkup = cloneDeep(SCHEDULE_EDIT_DEFAULT)
    
    switch (n) {
      case 7:
        newMarkup.reply_markup.inline_keyboard[0][2].text = '• 7 дней •'
        break;
      case 3:
        newMarkup.reply_markup.inline_keyboard[0][1].text = '• 3 дня •'
        break;
      default:
        newMarkup.reply_markup.inline_keyboard[0][0].text = '• 1 день •'
    }

    const tmp = cloneDeep(message.reply_markup)
    tmp.inline_keyboard.forEach(el => el.forEach(e => e.hide = false))
    if (isEqual(newMarkup.reply_markup, tmp)) return

    ctx.editMessageText(result, newMarkup)
  }
}

const schedule1d = scheduleChange()
const Schedule1d = new Action(schedule1d, "SCHEDULE_CHANGE_1D")

const schedule3d = scheduleChange(3)
const Schedule3d = new Action(schedule3d, "SCHEDULE_CHANGE_3D")

const schedule7d = scheduleChange(7)
const Schedule7d = new Action(schedule7d, "SCHEDULE_CHANGE_7D")

export const ScheduleChange = [Schedule1d, Schedule3d, Schedule7d]