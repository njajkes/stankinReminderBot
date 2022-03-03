import { SHOW_TASKS } from "../utils/markups";
import showTasksMessage from "../utils/messageForming/showTasksMessageForming";
import { parseCallbackQuery } from "../utils/parseCallbackQuery";
import { Action } from "./action";

function showTasksActionsMaker(mode: string) {
  return async function(ctx) {
    const result = await showTasksMessage(ctx.from.id, mode)
    if (result == parseCallbackQuery(ctx).message.text) {
      return
    }
    ctx.editMessageText(result, SHOW_TASKS)
  }
}

const ShowTasksW84a = new Action(showTasksActionsMaker("w84a"), "SHOW_TASKS_W84A")
const ShowTasksWaiting = new Action(showTasksActionsMaker("waiting"), "SHOW_TASKS_W8ING")

export const ShowTasksActions = [ShowTasksW84a, ShowTasksWaiting]