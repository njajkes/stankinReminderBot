import { taskModel } from "../../models/tasks";
import { timeToString } from "../../utils/timeToString";
import { comDesc } from '../comDesc'

export async function showTasks(ctx) {
  const w8ing4acceptTasks = await taskModel.find({uid: ctx.from.id, status: "w8ing4accept"}).sort({time: 1})
  const pendingTasks = await taskModel.find( { uid: ctx.from.id, status: ["pending", "waiting"] } ).sort({time: 1})
  if (!w8ing4acceptTasks.length && !pendingTasks.length) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Задач, ожидающих выполнения или принятия, не найдено 🤕")
    return
  }

  let result: string = ""
  if (w8ing4acceptTasks.length) {
    result += "Список задач, ожидающих вашего принятия: "
    w8ing4acceptTasks.forEach(task => {
      result += "\n\nИдентификатор задачи: " + task._id.toString() +'.\nПредмет: ' + task.discipline + '\nОписание: ' + task.description + "\nК какому времени: " + timeToString(task.time)
    })
    result += "\n\n"
  }
  if (pendingTasks.length) {
    result += "Список ваших задач: "
    pendingTasks.forEach(task => {
      result += "\n\nИдентификатор задачи:" + task._id.toString() +'.\nПредмет: ' + task.discipline + '\nОписание: ' + task.description + "\nК какому времени: " + timeToString(task.time)
    })
  }
  
  ctx.telegram.sendMessage(ctx.message.chat.id, result)
}

export const showTasksDescription = new comDesc("/show_tasks", "посмотреть свои задачи", 0, "Возвращает как задачи, которые вы приняли, так и те, которые ожидают одобрения/отклонения")