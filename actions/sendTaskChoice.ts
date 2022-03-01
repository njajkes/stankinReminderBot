import { taskModel } from "../models/tasks";
import { parseCallbackQuery } from "../utils/parseCallbackQuery";
import { Action } from "./action";

function sendTaskChoice(status: string) {
  return async function(ctx) {
    const {taskID, message} = parseCallbackQuery(ctx, {task: true})
    const task = await taskModel.findOne({_id: taskID, status: "w8ing4accept"})
    if (!task) return
    task.status = status
    await task.save()
    let suffix = status == "waiting" ? "\n\nЗадача была успешно принята :)" : "\n\nЗадача была успешно отклонена!"
    ctx.editMessageText(message.text + suffix)
  }
}

const DeclineAction = new Action(sendTaskChoice("waiting"), "DECLINE_TASK_ACTION")
const AcceptAction = new Action(sendTaskChoice("decline"), "DECLINE_TASK_ACTION")

export const SendTaskChoice = [AcceptAction, DeclineAction]