import { createGroup } from "../controllers/groups";
import { groupModel } from "../models/groups";
import { comDesc } from "./commandDescription";

export async function addGroup(ctx) {
  const query: string[] = 
    ctx.update.message.text
    .split(' ').slice(1)
  if (query.length != 2) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Некорректное количество параметров 🤕\nПожалуйта, введите данные по форме. Подробнее: /help add_group")
    return
  }
  const tracked:number = +query[query.length - 1]
  if (isNaN(tracked)) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "В качестве последнего параметра введено не число 🤕\nПожалуйта, введите данные по форме. Подробнее: /help add_group")
    return
  }
  const groupName = query.slice(0, query.length - 1).join(' ')
  const gnameCheck = groupModel.findOne({groupName: groupName})
  if (gnameCheck) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "К сожалению, такая группа уже существует 🤕\nПопробуйте использовать другое название!")
  }
  await createGroup(groupName, !!tracked, ctx.from)
  ctx.telegram.sendMessage(ctx.message.chat.id, "Группа была успешно добавлена!\n")
}

export const addGroupDescription = new comDesc("/add_group [group_name] [tracked]", "добавление группы", 0, "group_name - название группы (1 слово без пробелов)", "tracked - будет ли группа отображаться в общем списке групп (0 или 1)", "Пример: /add_group клан_крутые_гремлины 0")