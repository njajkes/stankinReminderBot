import { userModel } from "../../models/users";
import { ARG_LEN_ERR_MESSAGE, PERM_ERR_MESSAGE, USER_NOT_FOUND_ERR_MESSAGE } from "../../utils/constants";
import { comDesc } from "../comDesc";

export async function ban(ctx) {
  const query = ctx.message.text.split(' ').slice(1)
  if (query.length != 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "ban")
    return
  }

  const [groupName, username] = query
  
  const user = await userModel.findOne({uid: ctx.from.id, groupName, role: "admin"})
  if (!user || user.username == username) {
    ctx.telegram.sendMessage(ctx.message.chat.id, PERM_ERR_MESSAGE + "ban")
    return
  }

  const banned = await userModel.findOne({username, groupName})
  if (!banned) {
    ctx.telegram.sendMessage(ctx.message.chat.id, USER_NOT_FOUND_ERR_MESSAGE + "ban")
    return
  }
  if (banned.role == "banned") {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Пользователь уже забанен в этой группе 🤕")
    return
  }

  const {uid} = banned
  banned.role = "banned"
  await banned.save()
  
  ctx.telegram.sendMessage(uid, `Вы были забанены в группе ${groupName}! \nТеперь для того, чтобы повторно в неё вступить, нужно, чтобы вас удалили из списка забаненных 🤕`)
  ctx.telegram.sendMessage(ctx.message.chat.id, `Пользователь @${username} был успешно забанен в группе ${groupName}! Наверно, так ему и надо 🤕\nДля того, чтобы разбанить его, введите /unban [group_name] [username].`)
}

export const banDescription = new comDesc("/ban [group_name] [username]", "удаляет пользователя из группы, если он есть в группе, и запрещает вступление в группу заново", 2)