import { taskModel } from "../models/tasks";
import { parseCallbackQuery } from "../utils/parseCallbackQuery";
import { Action } from "./action";

async function failedTaskAction(ctx) {
  const {taskID, message} = parseCallbackQuery(ctx, {task: true})
  
  const task = await taskModel.findOne({_id: taskID})
  task.status = "failed"
  await task.save()

  ctx.editMessageText(message.text + "\n\nЗадача была помечена как проваленная!")
}

export const FailedTaskAction = new Action(failedTaskAction, "FAILED_TASK_ACTION")