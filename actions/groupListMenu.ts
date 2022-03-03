import { groupListMarkupSwitcher, groupListMsg } from "../commands/all/groupsList";
import { getAllVisibleGroups } from "../controllers/groups";
import { parseCallbackQuery } from "../utils/parseCallbackQuery";
import { Action } from "./action";

function groupListMaker(type: string) {
  let c1: number, c2: number;
  
  if (type == 'next') {
    c1 = 0, c2 = 1
  } else if (type == 'prev') {
    c1 = -2, c2 = -1
  } else {
    throw new Error("Uncorrect type of group list action: " + type + ". Please, add new of group list action in function groupListMaker")
  }

  return async function (ctx) {
    const {nPageAll, nPageNow} = parseCallbackQuery(ctx, {list: true})
  
    const groups = await getAllVisibleGroups()
    const groupsNow = groups.slice((nPageNow + c1)*10+1, (nPageNow + c1)*10+11)
    const result = groupListMsg(nPageNow + c2, nPageAll, groupsNow)

    const markup = groupListMarkupSwitcher(nPageNow + c2, nPageAll)

    ctx.editMessageText(result, markup)
  }
} 

const GroupListNext = new Action(groupListMaker('next'), "GROUPS_LIST_NEXT")
const GroupListPrev = new Action(groupListMaker('prev'), "GROUPS_LIST_PREV")

export const GroupListActions = [GroupListNext, GroupListPrev]