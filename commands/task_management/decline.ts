import { ARG_LEN_ERR_MESSAGE, SYNTAX_ERR_MESSAGE } from "../../utils/constants";
import { taskModel } from "../../models/tasks";
import { comDesc } from '../comDesc'
import { command } from "../command";

async function decline(ctx) {
  const query = ctx.message.text.split(" ").slice(1) // task_id
  if (query.length != 1) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "decline")
    return
  }
  const [taskId] = query
  if (isNaN(+taskId)) {
    ctx.telegram.sendMessage(ctx.message.chat.id, SYNTAX_ERR_MESSAGE + "decline")
    return
  }
  const task = await taskModel.findOne({uid: ctx.from.id, _id: +taskId, status: "w8ing4accept"})
  if (!task) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Задача с таким id, ждущая того, чтобы вы её отклонили, не найдена 🤕")
    return
  }
  task.status = "decline"
  await task.save()
  ctx.telegram.sendMessage(ctx.message.chat.id, `Задача ${task._id} успешно отклонена!`)
}

const declineDescription = new comDesc("/decline [task_id]", "отклонить задачу, которую вам отправили", 0, "task_id - идентификатор задачи", "Пример: /decline 993")

export const Decline = new command(decline, "decline", declineDescription)