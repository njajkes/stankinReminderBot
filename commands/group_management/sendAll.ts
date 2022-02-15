import { groupModel } from "../../models/groups";
import { userModel } from "../../models/users";
import { ALLOWED_ROLES, ARG_LEN_ERR_MESSAGE, PERM_ERR_MESSAGE } from "../../utils/constants";
import { comDesc } from "../comDesc";
import { command } from "../command";

async function sendAll(ctx) {
  const query = ctx.message.text.split(' ').slice(1)
  
  if (query.length < 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, ARG_LEN_ERR_MESSAGE + "send_all")
    return
  }

  const [groupName, ...message] = query
  
  const group = await groupModel.find({groupName, adminID: ctx.from.id})
  if (!group) {
    ctx.telegram.sendMessage(ctx.message.chat.id, PERM_ERR_MESSAGE + "send_all")
    return
  }

  const users = await userModel.find({ groupName, role: ALLOWED_ROLES })
  
  if (!users) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "В данной группе есть только вы 🤕\nНам некому рассылать сообщения!\nДля просмотра заявок воспользуйтесь командой /show_candidates")
    return
  }

  let i = 0
  for (let user of users) {
    if (user.uid == ctx.from.id) continue;
    ctx.telegram.sendMessage(user.uid, `Сообщение от группы ${groupName}!\n\n${message.join(' ')}`)
    if (i++ >= 30) {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      i = 0
    }
  }

  ctx.telegram.sendMessage(ctx.message.chat.id, "Сообщение успешно разослано всем участникам группы " + groupName)
}

const sendAllDescription = new comDesc("/send_all [group_name] [message]", "отправить сообщение всем в группе", 3, "group_name - название группы", "message - текст, который вы хотите разослать всем в группе")

export const SendAll = new command(sendAll, "send_all", sendAllDescription)