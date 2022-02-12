import { start, startDescription } from './start'
import { help, helpDescription, helpFlagsDescription } from './help'
import { groupListDescription, groupsList } from './all/groupsList'
import { addTask, addTaskDescription } from './task_management/addTask'
import { addGroup, addGroupDescription } from './all/addGroup'
import { addMod, addModDescription } from './group_management/addMod'
import { sendTask, sendTaskDescription } from './group_management/sendTask'
import { showCandidates, showCandidatesDescription } from './group_management/showCandidates'
import { acceptJoin, acceptJoinDescription } from './members/acceptJoin'
import { groupInfo, groupInfoDescription } from './members/groupInfo'
import { joinGroup, joinGroupDescription } from './members/joinGroup'
import { accept, acceptDescription } from './task_management/accept'
import { decline, declineDescription } from './task_management/decline'
import { showTasks, showTasksDescription } from './task_management/showTasks'
import { setInfo, setInfoDescription } from './group_management/description/setInfo'
import { delInfo, delInfoDescription } from './group_management/description/delInfo'
import { about, aboutDescription } from './about'
import { delDaily, delDailyDescription } from './group_management/daily/delDaily'
import { setDaily, setDailyDescription } from './group_management/daily/setDaily'
import { ban, banDescription } from './group_management/ban'
import { kick, kickDescription } from './group_management/kick'
import { unban, unbanDescription } from './group_management/unban'
import { declineJoin, declineJoinDescription } from './members/declineJoin'
import { sendAll, sendAllDescription } from './group_management/sendAll'
import { sub, subDescription } from './members/sub'
import { unsub, unsubDescription } from './members/unsub'

class command {
  func: (ctx: any) => Promise<void>
  name: string

  constructor (func: (ctx: any) => Promise<void>, name: string) {
    this.func = func,
    this.name = name
  }
}

export const commands = [
  new command(start, "start"), // v.0.2.6
  new command(help, "help"), // v.0.2.6
  new command(about, "about"),
  new command(groupsList, "groups_list"), // v.0.2.6
  new command(addTask, "add_task"), // not tested
  new command(addGroup, "add_group"), // v.0.2.6
  new command(joinGroup, "join_group"), // not tested
  new command(acceptJoin, "accept_join"), // not tested
  new command(declineJoin, "decline_join"),
  new command(showCandidates, "show_candidates"), // v.0.2.6
  new command(addMod, "add_mod"), // not tested
  new command(accept, "accept"), // not tested
  new command(decline, "decline"), // not tested
  new command(sendTask, "send_task"), // not tested
  new command(showTasks, "show_tasks"), // v.0.2.6
  new command(groupInfo, "group_info"), // TODO: tests
  new command(setInfo, "set_info"),
  new command(delInfo, "del_info"),
  new command(setDaily, "set_daily"),
  new command(delDaily, "del_daily"),
  new command(sendAll, "send_all"),
  new command(ban, "ban"),
  new command(unban, "unban"),
  new command(kick, "kick"),
  new command(sub, "sub"),
  new command(unsub, "unsub")
]

export const commandDescriptions = [
  startDescription,
  helpDescription,
  aboutDescription,
  groupListDescription,
  addTaskDescription,
  addGroupDescription,
  helpFlagsDescription,
  joinGroupDescription,
  acceptJoinDescription,
  declineJoinDescription,
  showCandidatesDescription,
  addModDescription,
  acceptDescription,
  declineDescription,
  sendTaskDescription,
  showTasksDescription,
  groupInfoDescription,
  setInfoDescription,
  delInfoDescription,
  setDailyDescription,
  delDailyDescription,
  sendAllDescription,
  banDescription,
  unbanDescription,
  kickDescription,
  subDescription,
  unsubDescription
]