import { userModel } from "../../models/users";
import { ARG_LEN_ERR_MESSAGE, PERM_ERR_MESSAGE, USER_NOT_FOUND_ERR_MESSAGE } from "../../utils/constants";
import { comDesc } from "../comDesc";

export async function kick(ctx) {
  const query = ctx.message.text.split(' ').slice(1)
  if (query.length != 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "ban")
    return
  }

  const [groupName, username] = query
  
  const user = await userModel.findOne({uid: ctx.from.id, groupName, role: ["moderator", "admin"]})
  if (!user) {
    ctx.telegram.sendMessage(ctx.message.chat.id, PERM_ERR_MESSAGE + "kick")
    return
  }
  
  const userPerms = user.role == "admin" ? ["member", "moderator"] : "member"

  const kicked = await userModel.findOne({username, groupName, role: userPerms})
  if (!kicked) {
    ctx.telegram.sendMessage(ctx.message.chat.id, USER_NOT_FOUND_ERR_MESSAGE + "kick")
    return
  }

  const {uid} = kicked
  await kicked.delete()
  
  ctx.telegram.sendMessage(uid, `Вас удалили из группы ${groupName}! Наверно, это нехорошо 🤕`)
  ctx.telegram.sendMessage(ctx.message.chat.id, `Пользователь @${username} был успешно аннигилирован из группы ${groupName}! Наверно, так ему и надо 🤕`)
}

export const kickDescription = new comDesc("/kick [group_name] [username]", "выгоняет участника из группы", 3)