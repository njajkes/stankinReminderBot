import { userModel } from "../../models/users"
import { ALLOWED_ROLES, ARG_LEN_ERR_MESSAGE } from "../../utils/constants"
import { getStankinGroups } from "../../utils/getStankinGroups"
import { comDesc } from "../comDesc"

export async function sub(ctx) {
  const query = ctx.message.text.split(' ').slice(1)
  if (query.length != 1) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "sub")
    return
  }
  
  const [groupName] = query

  const stankinGroups = await getStankinGroups()
  if (!stankinGroups.includes(groupName)) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Эта группы не является группой МГТУ \"СТАНКИН\", из-за чего мы не можем предоставить вам данную функцию 🤕")
    return
  }

  const user = await userModel.findOne({groupName, uid: ctx.from.id, role: ALLOWED_ROLES})
  if (!user) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Группа не найдена, либо вы не являетесь участником в ней 🤕")
    return
  }
  if (user.subscribe) {
    ctx.telegram.sendMessage(ctx.message.chat.id, `Вы уже подписаны на группу ${groupName} 🤕`)
    return
  }

  user.subscribe = true
  await user.save()

  ctx.telegram.sendMessage(ctx.message.chat.id, `Вы успешно подписались на рассылку расписания группы ${groupName}!`)
}

export const subDescription = new comDesc("/sub [group_name]", "подписаться на расписание своей группы", 0, "group_name - группа, на расписание которой вы хотите подписаться. Вы должны состоять в ней (по умолчанию, при вступлении в СТАНКИНовскую группу вы подписываетесь на неё).")