import { getAllVisibleGroups } from "../controllers/groups";
import { comDesc } from "./commandDescription";

export async function groupsList(ctx) {
  let result = 'Список отображаемых групп:\n'
  const groups = await getAllVisibleGroups()
  for (let k of groups) {
    const {groupID, groupName} = k
    result += '\n' + groupID + '. ' + groupName + ';'
  }
  ctx.telegram.sendMessage(ctx.message.chat.id, result)
}

export const groupListDescription = new comDesc("/groups_list", "вывод всех видимых групп;")