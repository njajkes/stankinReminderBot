import { groupModel } from "../../models/groups";
import { userModel } from "../../models/users";
import { ARG_LEN_ERR_MESSAGE } from "../../utils/constants";
import { comDesc } from '../comDesc'

export async function showCandidates (ctx): Promise<void> {
  const query = ctx.message.text.split(' ').slice(1)
  if (query.length != 1) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "show_candidates")
    return
  }
  const group = await groupModel.findOne({groupName: query[0], adminID: ctx.from.id})
  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Такой группы не существует, либо вы не являетесь админом в ней 🤕")
    return
  }
  const users = await userModel.find({groupName: group.groupName, role: ["pending", "sended"]})
  if (users.length < 1) {
    ctx.telegram.sendMessage(ctx.message.chat.id, `Ожидающих вступления в группу ${group.groupName} не найдено :p`)
    return
  }
  let result = 'Список ожидающих вступления в группу ' + group.groupName + ": ", i = 1
  for (let el of users) {
    el.role = "pending"
    await el.save()
    result += "\n" + i.toString() + ". @" + el.username
    i++
  }
  ctx.telegram.sendMessage(ctx.message.chat.id, result)
}

export const showCandidatesDescription = new comDesc("/show_candidates [group_name]", "вывести список всех ожидающих вступления в группу", 2, "group_name - название группы, в которой вы являетесь админом")