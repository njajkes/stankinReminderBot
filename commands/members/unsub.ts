import { userModel } from "../../models/users"
import { ALLOWED_ROLES, ARG_LEN_ERR_MESSAGE } from "../../utils/constants"
import { getStankinGroups } from "../../utils/getStankinGroups"
import { comDesc } from "../comDesc"
import { command } from "../command"

async function unsub(ctx) {
  const query = ctx.message.text.split(' ').slice(1)
  if (query.length != 1) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "unsub")
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

  if (!user.subscribe) {
    ctx.telegram.sendMessage(ctx.message.chat.id, `Вы уже отписаны от группы ${groupName} 🤕`)
    return
  }

  user.subscribe = false
  await user.save()

  ctx.telegram.sendMessage(ctx.message.chat.id, `Вы успешно отписались от рассылки расписания группы ${groupName}!`)
}

const unsubDescription = new comDesc("/unsub [group_name]", "отписаться от расписания своей группы", 0, "group_name - группа, от расписания которой вы хотите отписаться. Вы должны состоять в ней и быть подписаны (по умолчанию, при вступлении в СТАНКИНовскую группу вы подписываетесь на неё).")

export const Unsub = new command(unsub, "unsub", unsubDescription)