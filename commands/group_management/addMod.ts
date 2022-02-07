import { groupModel } from "../../models/groups"
import { userModel } from "../../models/users"
import { ARG_LEN_ERR_MESSAGE } from "../../utils/constants"
import { comDesc } from "../commands"

export async function addMod(ctx): Promise<void> {
  const query: string[] = ctx.message.text.split(' ').slice(1)
  if (query.length != 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "add_mod")
    return
  }
  const group = await groupModel.findOne({groupName: query[0], adminID: ctx.from.id})
  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Не найдено такой группы, либо вы в ней не админ 🤕")
    return
  }
  const user = await userModel.findOne({groupName: query[0], username: query[1]})
  if (!user || user.role == "sended" || user.role == "pending") {
    ctx.telegram.sendMessage(
      ctx.message.chat.id, 
      "Такого пользователя в вашей группе нет 🤕\nИспользуйте /show_candidates для того, чтобы посмотреть заявки в группу"
    )
    return
  }
  if (user.role != "member") {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Этот пользователь уже является модератором, либо админом 🤕")
    return
  }
  user.role = "moderator"
  await user.save()
  ctx.telegram.sendMessage(ctx.message.chat.id, "Пользователь успешно добавлен в модераторы!")
}

export const addModDescription = new comDesc("/add_mod [group_name] [username]", "добавить модератора в группу", 2, "group_name - группа, в которую вы хотите добавить модератора", "username - ник пользователя (без \"@\"), которого вы хотите добавить в модераторы", "Пример: /add_mod клан_крутые_гремлины vasya")