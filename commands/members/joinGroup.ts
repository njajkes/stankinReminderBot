import { groupModel } from "../../models/groups";
import { userModel } from "../../models/users";
import { ARG_LEN_ERR_MESSAGE } from "../../utils/constants";
import { comDesc } from '../comDesc'
import { command } from "../command";

async function joinGroup(ctx): Promise<void> {
  const query = ctx.message.text.split(' ').slice(1)
  if (query.length != 1) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "join_group")
    return
  } 
  const group = await groupModel.findOne({groupName: query[0]})
  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Такой группы не найдено 🤕\nПожалуйста, проверьте корректность введённых данных")
    return
  }
  const user = await userModel.findOne({uid: ctx.from.id, groupName: query[0]})
  if (user) {
    if (user.role == "sended" || user.role == "pending") {
      ctx.telegram.sendMessage(ctx.message.chat.id, "Вы уже подали заявку в эту группу 🤕")
    } else {
      ctx.telegram.sendMessage(ctx.message.chat.id, "Вы уже состоите в этой группе 🤕")
    }
    return
  }
  await userModel.create({
    uid: ctx.from.id,
    username: ctx.from.username,
    groupName: group.groupName,
    role: "sended",
    subscribe: false
  })
  ctx.telegram.sendMessage(ctx.message.chat.id, "Заявка на вступление в группу " + group.groupName + " успешно отправлена!")
}

const joinGroupDescription = new comDesc("/join_group [group_name]", "отправить заявку на вступление в группу", 0, "group_name - название группы одним словом (как написано в /group_list, например: \"клан_крутые_гремлины\" вместо \"клан крутые гремлины\")", "Пример: /join_group клан_крутые_гремлины")

export const JoinGroup = new command(joinGroup, "join_group", joinGroupDescription)