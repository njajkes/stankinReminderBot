import { taskValidation } from "../controllers/tasks";
import { groupModel } from "../models/groups";
import { taskModel } from "../models/tasks";
import { userModel } from "../models/users";
import { comDesc } from "./commandDescription";

export async function sendTask(ctx): Promise<void> {
  const query = ctx.message.text.split(' ').slice(1)

  const groupQuery = query[0]
  const group = await groupModel.findOne({groupName: groupQuery})
  const user = await userModel.findOne({uid: ctx.from.id, groupName: groupQuery, $or: [{role: "moderator"}, {role: "admin"}]})

  if (!group || !user || (user.role !== "moderator" && user.role !== "admin")) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Группа не найдена либо вы не являетесь в ней модератором или админом 🤕")
    return
  }

  const taskQuery = query.slice(1)
  if (!taskValidation(taskQuery)) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Нарушен синтаксис команды 🤕\nПожалуйста, проверьте корректность введённых данных\nПодробнее: /help send_task")
    return
  }

  const time: number = (new Date(taskQuery.slice(0, 4).join(' '))).getTime()
  const discipline = taskQuery[4].split('_').join(' ')
  const description = taskQuery.slice(5).join(' ')

  const groupMembers = await userModel.find({groupName: groupQuery, $or: [{role: "member"}, {role: "moderator"}, {role: "admin"}]})
  groupMembers.forEach(async member => {
    const task = await taskModel.create({
      uid: member.uid,
      description: description,
      discipline: discipline,
      time: time,
      status: "w8ing4accept"
    })
    ctx.telegram.sendMessage(member.uid, 
      `Новая задача от ${group}!\ntask_id: ${task._id}\n\nПредмет: ${discipline}\n\nОписание:${description}\n\nЧтобы принять, введите /accept ${task._id}\nЧтобы отклонить, введите /decline ${task._id}`)
  })
  ctx.telegram.sendMessage(ctx.message.chat.id, `Задача успешно разослана всем в группе ${groupQuery}!`)
}
export const sendTaskDescription = new comDesc(
  "/send_task [group] [time] [description] [discipline]", 
  "отправить задачу участникам группы", 
  3, 
  "group_name - группа, в которую вы хотите отправить задачу",
  "time - время в формате \"DD MM YYYY hh:mm\"",
  "description - содержит описание задачи",
  "discipline - содержит предмет, по поводу которого срабатывает напоминание. \n    ВАЖНО: При указании предмета, пробелы заменяются нижними подчеркиваниями для успешного парса строки",
  "Пример: /add_task клан_крутые_гремлины 01 01 2023 15:45 Другое покушать")