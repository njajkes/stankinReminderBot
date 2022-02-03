import { taskModel } from "../models/tasks";
import { comDesc } from "./commandDescription";

export async function decline(ctx) {
  const query = ctx.message.text.split(" ")[1] // task_id
  const task = await taskModel.findOne({uid: ctx.from.id, _id: query, status: "w8ing4accept"})
  if (!task) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Задача с таким id, ждущая того, чтобы вы её отклонили, не найдена 🤕")
    return
  }
  task.status = "decline"
  task.save()
  ctx.telegram.sendMessage(ctx.message.chat.id, `Задача ${task._id} успешно отклонена!`)
}

export const declineDescription = new comDesc("/decline [task_id]", "отклонить задачу, которую вам отправили", 0, "task_id - идентификатор задачи", "Пример: /decline 993")