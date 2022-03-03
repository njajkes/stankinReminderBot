import { taskModel } from "../../models/tasks"
import { timeToString } from "../timeToString"

export default async function showTasksMessage(uid: number, mode: string): Promise<string> {
  let status: string[]
  
  if (mode == "w84a") {
    status = ["w8ing4accept"] 
  } else {
    status = ["pending", "waiting"]
  }

  let result = mode == "w84a" ? "Список задач, ожидающих вашего принятия: " : "Список задач, ждущих выполнения: "
  const tasks = await taskModel.find( { uid, status } ).sort({time: 1})
  
  if (!tasks.length) {
    result += '\n\nТаковых не найдено :(' 
    return result
  }
  
  tasks.forEach(task => {
    result += "\n\nИдентификатор задачи: " + task._id.toString() +'.\nПредмет: ' + task.discipline + '\nОписание: ' + task.description + "\nК какому времени: " + timeToString(task.time)
  })
  
  return result
}