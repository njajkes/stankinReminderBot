import { createTask } from "../controllers/tasks";
import { comDesc } from "./commandDescription";

export async function addTask(ctx) {
  const query: string[] = 
  ctx.update.message.text
    .split('/').join(' ')
    .split('-').join(' ')
    .split('.').join(' ')
    .split(' ').slice(2)

  const query_time: string[] = query.slice(0, 4);
  [ query_time[0], query_time[1] ] = [ query_time[1], query_time[0] ]

  const time: number = (new Date(query_time.join(' '))).getTime()
  const discipline = query[query.length - 1].split('_').join(' ')
  const description = query.slice(4, query.length - 1).join(' ')

  createTask(ctx.from.id, discipline, time, description)
  
  ctx.telegram.sendMessage(ctx.message.chat.id, "Задача успешно добавлена!")
}

export const addTaskDescription = new comDesc(
  "/add_task [time] [description] [discipline]", 
  "добавляет персональную задачу",
  "time - время в формате \"DD MM YYYY hh:mm\"",
  "description - содержит описание задачи",
  "discipline - содержит предмет, по поводу которого срабатывает напоминание. \n    ВАЖНО: При указании предмета, пробелы заменяются нижними подчеркиваниями для успешного парса строки",
  "Пример: /add_task 01 01 2025 15:55 Сдать контрольную Математическая_логика_и_теория_алгоритмов")