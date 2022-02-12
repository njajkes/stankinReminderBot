import { groupModel } from "../../models/groups";
import { userModel } from "../../models/users";
import { ALLOWED_ROLES, ARG_LEN_ERR_MESSAGE } from "../../utils/constants";
import { comDesc } from '../comDesc'

export async function groupInfo(ctx): Promise<void> {
  const query = ctx.message.text.split(' ')[1]

  if (!query) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "group_info")
    return
  }
  
  const group = await groupModel.findOne({groupName: query})
  const groupMembers = await userModel.find({groupName: query, role: ALLOWED_ROLES})
  const user = await userModel.findOne({groupName: query, uid: ctx.from.id, role: ALLOWED_ROLES})
  
  if (!user) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Вы не состоите в группе, информацию о которой хотите получить")
    return
  }
  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Такой группы не найдено")
    return
  }
  if (group.groupName == "Community") { // i did this in order not to show info about all users who use bot 
    ctx.telegram.sendMessage(ctx.message.chat.id, "А в эту группу смотреть нельзя")
    return
  }

  let result = "Название группы: " + group.groupName + "\nАдминистратор группы: @" + group.adminUsername + "\n\n", i = 1
  
  if (group.description) result += "Описание группы: \n" + group.description + "\n\n"
  if (group.daily) result += "Сообщение дня: \n" + group.daily + "\n\n"
  
  result += "Список участников: "
  groupMembers.forEach(member => {
    result += "\n" + i.toString() + " @" + member.username + " — " + member.role;
    i++
  })
  
  ctx.telegram.sendMessage(ctx.message.chat.id, result)
}

export const groupInfoDescription = new comDesc("/group_info [group_name]", "выводит информацию о группе", 0, "group_name - название группы, информацию о которой вы хотите получить", "Выводит описание, сообщение дня и участников группы")