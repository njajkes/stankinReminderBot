import { groupModel } from "../../models/groups"
import { userModel } from "../../models/users"
import { ARG_LEN_ERR_MESSAGE, PERM_ERR_MESSAGE, USER_NOT_FOUND_ERR_MESSAGE } from "../../utils/constants"
import { comDesc } from '../comDesc'
import { command } from "../command"

async function addMod(ctx): Promise<void> {
  const query: string[] = ctx.message.text.split(' ').slice(1)

  if (query.length != 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "add_mod")
    return
  }
  
  const [groupName, username] = query

  const group = await groupModel.findOne({groupName, adminID: ctx.from.id})
  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, PERM_ERR_MESSAGE + "add_mod")
    return
  }
  
  const user = await userModel.findOne({groupName, username, role: "member"})
  if (!user) {
    ctx.telegram.sendMessage(ctx.message.chat.id, USER_NOT_FOUND_ERR_MESSAGE + "add_mod")
    return
  }

  user.role = "moderator"
  await user.save()
  ctx.telegram.sendMessage(user.uid, `Вы были добавлены в модераторы в группе ${groupName}!\nДля просмотра команд, доступных для модераторов, введите /help -mod`)
  ctx.telegram.sendMessage(ctx.message.chat.id, `Пользователь ${username} успешно добавлен в модераторы!`)
}

const addModDescription = new comDesc("/add_mod [group_name] [username]", "добавить модератора в группу", 2, "group_name - группа, в которую вы хотите добавить модератора", "username - ник пользователя (без \"@\"), которого вы хотите добавить в модераторы", "Пример: /add_mod клан_крутые_гремлины vasya")

export const AddMod = new command(addMod, "add_mod", addModDescription)