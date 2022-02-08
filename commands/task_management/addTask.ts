import { createTask, taskValidation } from "../../controllers/tasks";
import { SYNTAX_ERR_MESSAGE } from "../../utils/constants";
import { comDesc } from '../comDesc'

export async function addTask(ctx):Promise<void> {
  const query: string[] = 
  ctx.update.message.text
    .split('/').join(' ')
    .split('-').join(' ')
    .split('.').join(' ')
    .split(' ').slice(2)
  
  if (!taskValidation(query)) {
    ctx.telegram.sendMessage(ctx.message.chat.id, SYNTAX_ERR_MESSAGE + "add_task")
    return
  }

  [ query[0], query[1] ] = [ query[1], query[0] ]
  const time: number = (new Date(query.slice(0, 4).join(' '))).getTime()
  const discipline = query[4].split('_').join(' ')
  const description = query.slice(5).join(' ')

  createTask(ctx.from.id, discipline, time, description)
  
  ctx.telegram.sendMessage(ctx.message.chat.id, "Задача успешно добавлена!")
}

export const addTaskDescription = new comDesc(
  "/add_task [time] [discipline] [description]", 
  "добавить персональную задачу",
  0,
  "time - время в формате \"DD MM YYYY hh:mm\"",
  "discipline - содержит предмет, по поводу которого срабатывает напоминание.", 
  "description - содержит описание задачи",
  "ВАЖНО: При указании предмета, пробелы заменяются нижними подчеркиваниями для успешного парса строки",
  "Пример: /add_task 01 01 2025 15:55 Математическая_логика_и_теория_алгоритмов Сдать контрольную")