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

class command {
  func: (ctx: any) => Promise<void>
  name: string

  constructor (func: (ctx: any) => Promise<void>, name: string) {
    this.func = func,
    this.name = name
  }
}

export class comDesc {
  commandName: string
  commandDescription: string
  permissions: number
  args?: string[]

  constructor(commandName: string, commandDescription: string, permissions: number, ...args: string[]) {
    this.commandName = commandName
    this.commandDescription = commandDescription
    this.permissions = permissions
    this.args = args
  }
}

export const commands = [
  new command(start, "start"), // v.0.2.6
  new command(help, "help"), // v.0.2.6
  new command(groupsList, "groups_list"), // v.0.2.6
  new command(addTask, "add_task"), // not tested
  new command(addGroup, "add_group"), // v.0.2.6
  new command(joinGroup, "join_group"), // not tested
  new command(acceptJoin, "accept_join"), // not tested
  new command(showCandidates, "show_candidates"), // v.0.2.6
  new command(addMod, "add_mod"), // not tested
  new command(accept, "accept"), // not tested
  new command(decline, "decline"), // not tested
  new command(sendTask, "send_task"), // not tested
  new command(showTasks, "show_tasks"), // v.0.2.6
  new command(groupInfo, "group_info") // TODO: tests
]

export const commandDescriptions = [
  startDescription,
  helpDescription,
  groupListDescription,
  addTaskDescription,
  addGroupDescription,
  helpFlagsDescription,
  joinGroupDescription,
  acceptJoinDescription,
  showCandidatesDescription,
  addModDescription,
  acceptDescription,
  declineDescription,
  sendTaskDescription,
  showTasksDescription,
  groupInfoDescription
]