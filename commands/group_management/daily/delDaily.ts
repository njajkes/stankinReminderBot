import { groupModel } from "../../../models/groups";
import { ARG_LEN_ERR_MESSAGE, PERM_ERR_MESSAGE } from "../../../utils/constants";
import { comDesc } from '../../comDesc'

export async function delDaily(ctx) {
  const query: string[] = ctx.message.text.split(' ').slice(1)

  if (query.length < 1) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "del_daily")
    return
  }

  const groupName: string = ctx.message.text.split(' ')[1]
  const group = await groupModel.findOne({groupName: groupName, adminID: ctx.from.id})

  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, PERM_ERR_MESSAGE + "del_daily")
    return
  }  

  group.daily = undefined
  await group.save()

  ctx.telegram.sendMessage(ctx.message.chat.id, `Сообщение дня для группы ${groupName} успешно удалено!`)
}

export const delDailyDescription = new comDesc("/del_info [group_name]", "безвозвратно стирает сообщение дня группы", 2, "group_name - группа, сообщение дня которой вы хотите удалить", "ВАЖНО: это действие нельзя будет отменить. Отдавайте себе отчёт о том, что делаете.")