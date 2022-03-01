import { taskModel } from "../models/tasks";
import { parseCallbackQuery } from "../utils/parseCallbackQuery";
import { Action } from "./action";

async function doneTaskAction(ctx) {
  const {taskID, message} = parseCallbackQuery(ctx, {task: true})
  
  const task = await taskModel.findOne({_id: taskID})
  task.status = "done"
  await task.save()

  ctx.editMessageText(message.text + "\n\nЗадача была помечена как выполненная!")
}

export const DoneTaskAction = new Action(doneTaskAction, "DONE_TASK_ACTION")