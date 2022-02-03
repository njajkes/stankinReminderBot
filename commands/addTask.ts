import { createTask, taskValidation } from "../controllers/tasks";
import { comDesc } from "./commandDescription";

export async function addTask(ctx):Promise<void> {
  const query: string[] = 
  ctx.update.message.text
    .split('/').join(' ')
    .split('-').join(' ')
    .split('.').join(' ')
    .split(' ').slice(2)

  if (!taskValidation(query)) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Нарушен синтаксис команды 🤕\nПожалуйста, проверьте корректность введённых данных\nПодробнее: /help add_task")
    return
  }

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