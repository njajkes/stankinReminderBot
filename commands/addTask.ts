import { createTask } from "../controllers/tasks";
import { comDesc } from "./commandDescription";
import { timeValidation } from "../utils/timeValidation"

export async function addTask(ctx):Promise<void> {
  const query: string[] = 
  ctx.update.message.text
    .split('/').join(' ')
    .split('-').join(' ')
    .split('.').join(' ')
    .split(' ').slice(2)
  if (query.length < 6) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Введено недостаточно параметров 🤕\nПожалуйта, введите данные по форме. Подробнее: /help add_task")
    return
  }
  const query_time: string[] = query.slice(0, 4);
  [ query_time[0], query_time[1] ] = [ query_time[1], query_time[0] ]

  if (!timeValidation(query_time)) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Неправильный ввод даты и/или времени 🤕\nПожалуйста заполните дату по форме. Подробнее: /help add_task")
  }


  const time: number = (new Date(query_time.join(' '))).getTime()
  const discipline = query[query.length - 1].split('_').join(' ')
  const description = query.slice(4, query.length - 1).join(' ')

  createTask(ctx.from.id, discipline, time, description)
  
  ctx.telegram.sendMessage(ctx.message.chat.id, "Задача успешно добавлена!")
}

export const addTaskDescription = new comDesc(
  "/add_task [time] [description] [discipline]", 
  "добавить персональную задачу",
  0,
  "time - время в формате \"DD MM YYYY hh:mm\"",
  "description - содержит описание задачи",
  "discipline - содержит предмет, по поводу которого срабатывает напоминание. \n    ВАЖНО: При указании предмета, пробелы заменяются нижними подчеркиваниями для успешного парса строки",
  "Пример: /add_task 01 01 2025 15:55 Сдать контрольную Математическая_логика_и_теория_алгоритмов")