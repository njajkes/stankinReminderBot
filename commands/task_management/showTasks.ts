import { SHOW_TASKS } from "../../utils/markups";
import showTasksMessage from "../../utils/messageForming/showTasksMessageForming";
import { comDesc } from '../comDesc'
import { command } from "../command";

async function showTasks(ctx) {
  let result = `${(await showTasksMessage(ctx.from.id, "w84a"))}\n\n${(await showTasksMessage(ctx.from.id, "waiting"))}`
  
  ctx.telegram.sendMessage(ctx.message.chat.id, result, SHOW_TASKS)
}

const showTasksDescription = new comDesc("/show_tasks", "посмотреть свои задачи", 0, "Возвращает как задачи, которые вы приняли, так и те, которые ожидают одобрения/отклонения")

export const ShowTasks = new command(showTasks, "show_tasks", showTasksDescription)