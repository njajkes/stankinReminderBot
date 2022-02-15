import { groupModel } from "../../models/groups";
import { userModel } from "../../models/users";
import { ARG_LEN_ERR_MESSAGE, PERM_ERR_MESSAGE, USER_NOT_FOUND_ERR_MESSAGE } from "../../utils/constants";
import { comDesc } from '../comDesc'
import { command } from "../command";

async function declineJoin(ctx): Promise<void> {
  const query:string[] = ctx.message.text.split(' ').slice(1)
  if (query.length != 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "decline_join")
    return
  }
  const [groupName, username] = query

  const group = await groupModel.findOne({groupName: groupName, adminID: ctx.from.id})
  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, PERM_ERR_MESSAGE + "decline_join")
    return
  }

  const user = await userModel.findOne({username: username, groupName: groupName, role: ["sended", "pending"]})
  if (!user) {
    ctx.telegram.sendMessage(ctx.message.chat.id, USER_NOT_FOUND_ERR_MESSAGE + "decline_join")
    return
  }

  await user.delete()
  
  ctx.telegram.sendMessage(ctx.message.chat.id, `Заявка пользователя @${username} на вступление в группу ${groupName} успешно отклонена!`)
  ctx.telegram.sendMessage(user.uid, `Вашу заявку в группу ${groupName} отклонили!`)
}

const declineJoinDescription = new comDesc("/decline_join [group_name] [username]", "отклонить заявку на вступление в группу", 2, "group_name - название группы одним словом", "username - юзернейм кандидата на вступление (без символа \"@\")", "Пример: /decline_join клан_крутые_гремлины kirito993")

export const DeclineJoin = new command(declineJoin, "decline_join", declineJoinDescription)