import { taskModel } from "../../models/tasks";
import { ARG_LEN_ERR_MESSAGE } from "../../utils/constants";
import { comDesc } from "../commands";

export async function accept(ctx) {
  const query = ctx.message.text.split(" ").slice(1) // task_id

  if (query.length != 1) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "accept")
    return
  }

  const task = await taskModel.findOne({uid: ctx.from.id, _id: query, status: "w8ing4accept"})
  if (!task) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Задача с таким id, ждущая того, чтобы вы её приняли, не найдена 🤕")
    return
  }
  task.status = "waiting"
  task.save()
  ctx.telegram.sendMessage(ctx.message.chat.id, `Задача ${task._id} успешно сохранена!`)
}

export const acceptDescription = new comDesc("/accept [task_id]", "принять задачу, которую вам отправили", 0, "task_id - идентификатор задачи", "Пример: /accept 993")