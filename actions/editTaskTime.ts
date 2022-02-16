import { Action } from "./action";
import { EDIT_TASK_TIME_1_PAGE, EDIT_TASK_TIME_2_PAGE } from "../utils/markups"
async function editTaskTime(ctx) {
  ctx.editMessageReplyMarkup(EDIT_TASK_TIME_1_PAGE)
}

async function editTaskTime2(ctx) {
  ctx.editMessageReplyMarkup(EDIT_TASK_TIME_2_PAGE)
}

const EditTaskTime = new Action(editTaskTime, "EDIT_TASK_TIME_ACTION")
const EditTaskTime2 = new Action(editTaskTime2, "EDIT_TASK_TIME_2_ACTION")

export const EditsTaskTime = [EditTaskTime, EditTaskTime2]