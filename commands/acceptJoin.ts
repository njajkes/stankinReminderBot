import { groupModel } from "../models/groups";
import { userModel } from "../models/users";
import { comDesc } from "./commandDescription";

export async function acceptJoin(ctx): Promise<void> {
  const query:string[] = ctx.message.text.split(' ').slice(1)
  if (query.length != 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Введено неверное количество аргументов 🤕\nПожалуйста, проверьте корректность введённых данных.\nПодробнее: /help accept_join")
    return
  }
  const group = await groupModel.findOne({groupName: query[0], adminID: ctx.from.id})
  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Такой группы не существует, либо вы не являетесь админом в ней 🤕")
    return
  }
  const user = await userModel.findOne({username: query[1], groupName: query[0]})
  if (!user) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Такой пользователь не найден в списке ожидающих 🤕")
    return
  }
  if (user.role == "sended" || user.role == "pending") {
    user.role = "member"
  } else {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Пользователь уже является участником группы 🤕")
    return
  }
  await user.save()
  ctx.telegram.sendMessage(ctx.message.chat.id, `Пользователь @${user.username} успешно добавлен в группу!`)
}

export const acceptJoinDescription = new comDesc("/accept_join [group_name] [username]", "принять заявку на вступление в группу", 2, "group_name - название группы одним словом", "username - юзернейм кандидата на вступление (без символа \"@\"", "Пример: /accept_join клан_крутые_гремлины kirito993")