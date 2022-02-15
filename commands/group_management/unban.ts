import { userModel } from "../../models/users";
import { ARG_LEN_ERR_MESSAGE, PERM_ERR_MESSAGE, USER_NOT_FOUND_ERR_MESSAGE } from "../../utils/constants";
import { comDesc } from "../comDesc";
import { command } from "../command";

async function unban(ctx) {
  const query = ctx.message.text.split(' ').slice(1)
  if (query.length != 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "ban")
    return
  }

  const [groupName, username] = query
  
  const user = await userModel.findOne({uid: ctx.from.id, groupName, role: "admin"})
  if (!user) {
    ctx.telegram.sendMessage(ctx.message.chat.id, PERM_ERR_MESSAGE + "unban")
    return
  }

  const banned = await userModel.findOne({username, groupName, role: "banned"})
  if (!banned) {
    ctx.telegram.sendMessage(ctx.message.chat.id, USER_NOT_FOUND_ERR_MESSAGE + "unban")
    return
  }

  const {uid} = banned
  await banned.delete()
  
  ctx.telegram.sendMessage(
    uid, 
    "Вас разбанили в группе " + groupName + "! Наверно, это хорошо 🤕\nЧтобы вступить в группу заново, подайте заявку в группу при помощи команды /join_group" + groupName
  )
  ctx.telegram.sendMessage(
    ctx.message.chat.id, 
    "Пользователь @" + username + " был успешно разбанен в группе " + groupName + "!\nТеперь он сможет подать заявку в группу, а вы - принять его"
  )
}

const unbanDescription = new comDesc("/unban [group_name] [username]", "выгоняет участника из группы", 3)

export const Unban = new command(unban, "unban", unbanDescription)