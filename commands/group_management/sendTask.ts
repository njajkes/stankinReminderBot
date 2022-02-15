import { taskValidation } from "../../controllers/tasks";
import { groupModel } from "../../models/groups";
import { taskModel } from "../../models/tasks";
import { userModel } from "../../models/users";
import { ALLOWED_ROLES, ARG_LEN_ERR_MESSAGE, SYNTAX_ERR_MESSAGE } from "../../utils/constants";
import { comDesc } from '../comDesc'
import { command } from "../command";

async function sendTask(ctx): Promise<void> {
  const query = ctx.message.text.split(' ').slice(1)

  if (query.length < 7) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "send_task")
    return
  }

  const [groupQuery, ...taskQuery] = query
  
  const group = await groupModel.findOne({groupName: groupQuery})
  const user = await userModel.findOne({uid: ctx.from.id, groupName: groupQuery, role: ["moderator", "admin"]})

  if (!group || !user || (user.role !== "moderator" && user.role !== "admin")) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Группа не найдена либо вы не являетесь в ней модератором или админом 🤕")
    return
  }

  if (!taskValidation(taskQuery)) {
    ctx.telegram.sendMessage(ctx.message.chat.id, SYNTAX_ERR_MESSAGE + "send_task")
    return
  }

  const time = new Date(taskQuery.slice(0, 4).join(' '))
  time.setHours(time.getHours() - 3)
  const discipline = taskQuery[4].split('_').join(' ')
  const description = taskQuery.slice(5).join(' ')

  const groupMembers = await userModel.find({groupName: groupQuery, role: ALLOWED_ROLES})
  let i = 0;
  for (let member of groupMembers) {
    const task = await taskModel.create({
      uid: member.uid,
      description: description,
      discipline: discipline,
      time: time.getTime(),
      status: "w8ing4accept"
    })

    ctx.telegram.sendMessage(member.uid, 
      `Новая задача от ${group.groupName}!\ntask_id: ${task._id}\n\nПредмет: ${discipline}\n\nОписание: ${description}\n\nЧтобы принять, введите /accept ${task._id}\nЧтобы отклонить, введите /decline ${task._id}`)
    
    if (i++ >= 30) {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      i = 0
    }
  }
  ctx.telegram.sendMessage(ctx.message.chat.id, `Задача успешно разослана всем в группе ${groupQuery}!`)
}
const sendTaskDescription = new comDesc(
  "/send_task [group] [time] [description] [discipline]", 
  "отправить задачу участникам группы", 
  3, 
  "group_name - группа, в которую вы хотите отправить задачу",
  "time - время в формате \"DD MM YYYY hh:mm\"",
  "description - содержит описание задачи",
  "discipline - содержит предмет, по поводу которого срабатывает напоминание. \n    ВАЖНО: При указании предмета, пробелы заменяются нижними подчеркиваниями для успешного парса строки",
  "Пример: /add_task клан_крутые_гремлины 01 01 2023 15:45 Другое покушать")

export const SendTask = new command(sendTask, "send_task", sendTaskDescription)