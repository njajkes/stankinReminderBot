import { groupModel } from "../../../models/groups";
import { ARG_LEN_ERR_MESSAGE, PERM_ERR_MESSAGE } from "../../../utils/constants";
import { comDesc } from '../../comDesc'

export async function delInfo(ctx) {
  const query: string[] = ctx.message.text.split(' ').slice(1)

  if (query.length != 1) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "del_info")
    return
  }

  const [groupName] = query
  
  const group = await groupModel.findOne({groupName, adminID: ctx.from.id})

  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, PERM_ERR_MESSAGE + "del_info")
    return
  }  

  group.description = undefined
  await group.save()

  ctx.telegram.sendMessage(ctx.message.chat.id, `Информация о группе ${groupName} успешно обновлена!`)
}

export const delInfoDescription = new comDesc("/del_info [group_name]", "безвозвратно стирает описание группы", 2, "group_name - группа, информацию о которой вы хотите удалить", "ВАЖНО: это действие нельзя будет отменить. Отдавайте отчёт о том, что делаете.")