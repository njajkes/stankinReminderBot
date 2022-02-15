import { groupModel } from "../../../models/groups";
import { ARG_LEN_ERR_MESSAGE, PERM_ERR_MESSAGE } from "../../../utils/constants";
import { comDesc } from '../../comDesc'
import { command } from "../../command";

async function setDaily(ctx) {
  const query: string[] = ctx.message.text.split(' ').slice(1)

  if (query.length < 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "set_daily")
    return
  }

  const [groupName, ...newDaily] = query
  const group = await groupModel.findOne({groupName, adminID: ctx.from.id})

  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, PERM_ERR_MESSAGE + "set_daily")
    return
  }
  
  group.daily = newDaily.join(' ')
  await group.save()

  ctx.telegram.sendMessage(ctx.message.chat.id, `Сообщение дня для группы ${groupName} успешно обновлено!`)
}

const setDailyDescription = new comDesc("/set_daily [group_name] [daily_message]", "устанавливает описание группы", 2, "group_name - группа, информацию о которой вы хотите изменить", "daily_message - сообщение дня для группы", "Это сообщение будет разсылаться вечером и утром для всех, кто подписан на расписание, если вы устанавливаете его для группы МГТУ \"СТАНКИН\". В противном случае, это сообщение разошлётся моментально всем участникам группы", "ВАЖНО: предыдущее сообщение дня безвозвратно затрётся")

export const SetDaily = new command(setDaily, "set_daily", setDailyDescription)