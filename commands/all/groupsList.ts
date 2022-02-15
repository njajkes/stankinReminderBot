import { getAllVisibleGroups } from "../../controllers/groups";
import { comDesc } from '../comDesc'
import { command } from "../command";

async function groupsList(ctx): Promise<void> {
  let result = 'Список отображаемых групп:\n'
  const groups = await getAllVisibleGroups()
  for (let k of groups) {
    const {_id, groupName} = k
    result += '\n' + _id + '. ' + groupName
  }
  ctx.telegram.sendMessage(ctx.message.chat.id, result)
}

const groupListDescription = new comDesc("/groups_list", "вывести список всех видимых групп", 0)

export const GroupList = new command(groupsList, "group_list", groupListDescription)