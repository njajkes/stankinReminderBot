import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram";
import { getAllVisibleGroups } from "../../controllers/groups";
import { FIRST_GROUPS_LIST, LAST_GROUPS_LIST, MED_GROUPS_LIST } from "../../utils/markups";
import { comDesc } from '../comDesc'
import { command } from "../command";

async function groupsList(ctx): Promise<void> {
  const groups = await getAllVisibleGroups()
  const groupsOut = groups.slice(1, 11)

  let n = Math.ceil(groups.length / 10)

  const result = groupListMsg(1, n, groupsOut)
  const markup = groupListMarkupSwitcher(1, n)

  ctx.telegram.sendMessage(ctx.message.chat.id, result, markup)
}

export function groupListMsg(nPageNow: number, nPageAll: number, groups) {
  let result = `Список отображаемых групп:\n\nНомер страницы: ${nPageNow} из ${nPageAll}\n` 
  for (let k of groups) {
    const {_id, groupName} = k
    result += '\n' + _id + '. ' + groupName
  }
  return result
}

export function groupListMarkupSwitcher(nPageNow: number, nPageAll: number): Markup.Markup<InlineKeyboardMarkup> | null {
  if (nPageAll == 1) return null
  if (nPageNow == nPageAll) return LAST_GROUPS_LIST
  if (nPageNow == 1) return FIRST_GROUPS_LIST
  return MED_GROUPS_LIST
}

const groupListDescription = new comDesc("/groups_list", "вывести список всех видимых групп", 0)

export const GroupList = new command(groupsList, "groups_list", groupListDescription)