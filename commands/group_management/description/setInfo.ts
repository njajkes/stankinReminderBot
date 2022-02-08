import { groupModel } from "../../../models/groups";
import { ARG_LEN_ERR_MESSAGE, PERM_ERR_MESSAGE } from "../../../utils/constants";
import { comDesc } from '../../comDesc'

export async function setInfo(ctx) {
  const query: string[] = ctx.message.text.split(' ').slice(1)

  if (query.length < 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "set_info")
    return
  }

  const groupName: string = ctx.message.text.split(' ')[1]
  const group = await groupModel.findOne({groupName: groupName, adminID: ctx.from.id})

  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, PERM_ERR_MESSAGE + "set_info")
    return
  }
  
  const newDescription: string = query.slice(1).join(' ')
  
  group.description = newDescription
  await group.save()

  ctx.telegram.sendMessage(ctx.message.chat.id, `Информация о группе ${groupName} успешно обновлена!`)
}

export const setInfoDescription = new comDesc("/set_info [group_name] [info]", "устанавливает описание группы", 2, "group_name - группа, информацию о которой вы хотите изменить", "info - описание, которое вы хотите установить", "ВАЖНО: предыдущее описание безвозвратно затрётся")