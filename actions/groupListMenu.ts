import { groupListMarkupSwitcher, groupListMsg } from "../commands/all/groupsList";
import { getAllVisibleGroups } from "../controllers/groups";
import { parseCallbackQuery } from "../utils/parseCallbackQuery";
import { Action } from "./action";

async function groupListNext(ctx) {
  const {nPageAll, nPageNow} = parseCallbackQuery(ctx, {gl: true})
  
  const groups = await getAllVisibleGroups()
  const groupsNow = groups.slice((nPageNow)*10+1, (nPageNow)*10+11)
  const result = groupListMsg(nPageNow+1, nPageAll, groupsNow)

  const markup = groupListMarkupSwitcher(nPageNow+1, nPageAll)

  ctx.editMessageText(result, markup)
}

async function groupListPrev(ctx) {
  const {nPageAll, nPageNow} = parseCallbackQuery(ctx, {gl: true})
  
  const groups = await getAllVisibleGroups()
  const groupsNow = groups.slice((nPageNow-2)*10+1, (nPageNow-2)*10+11)
  const result = groupListMsg(nPageNow-1, nPageAll, groupsNow)

  const markup = groupListMarkupSwitcher(nPageNow-1, nPageAll)
  
  ctx.editMessageText(result, markup)
}

const GroupListNext = new Action(groupListNext, "GROUPS_LIST_NEXT")
const GroupListPrev = new Action(groupListPrev, "GROUPS_LIST_PREV")

export const GroupListActions = [GroupListNext, GroupListPrev]