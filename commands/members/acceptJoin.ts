import { groupModel } from "../../models/groups";
import { userModel } from "../../models/users";
import { ARG_LEN_ERR_MESSAGE, PERM_ERR_MESSAGE, USER_NOT_FOUND_ERR_MESSAGE } from "../../utils/constants";
import { getStankinGroups } from "../../utils/getStankinGroups";
import { comDesc } from '../comDesc'

export async function acceptJoin(ctx): Promise<void> {
  const query:string[] = ctx.message.text.split(' ').slice(1)
  if (query.length != 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "accept_join")
    return
  }
  const [groupName, username] = query

  const group = await groupModel.findOne({groupName: groupName, adminID: ctx.from.id})
  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, PERM_ERR_MESSAGE + "accept_join")
    return
  }

  const user = await userModel.findOne({username: username, groupName: groupName, role: ["sended", "pending"]})
  if (!user) {
    ctx.telegram.sendMessage(ctx.message.chat.id, USER_NOT_FOUND_ERR_MESSAGE + "accept_join")
    return
  }

  const stGroups = await getStankinGroups()
  
  if (stGroups.includes(groupName)) user.subscribe = true

  user.role = "member"
  await user.save()
  
  ctx.telegram.sendMessage(ctx.message.chat.id, `Пользователь @${user.username} успешно добавлен в группу!`)
  ctx.telegram.sendMessage(user.uid, `Вас успешно приняли в группу ${user.groupName}!`)
}

export const acceptJoinDescription = new comDesc("/accept_join [group_name] [username]", "принять заявку на вступление в группу", 2, "group_name - название группы одним словом", "username - юзернейм кандидата на вступление (без символа \"@\"", "Пример: /accept_join клан_крутые_гремлины kirito993")