import { start, startDescription } from './start'
import { help, helpDescription, helpFlagsDescription } from './help'
import { groupListDescription, groupsList } from "./groupsList"
import { addTask, addTaskDescription } from './addTask'
import { addGroup, addGroupDescription } from './addGroup'
import { joinGroup, joinGroupDescription } from './joinGroup'
import { acceptJoin, acceptJoinDescription } from './acceptJoin'
import { showCandidates, showCandidatesDescription } from './showCandidates'
import { addMod, addModDescription } from './addMod'
import { accept, acceptDescription } from './accept'
import { decline, declineDescription } from './decline'
import { sendTask, sendTaskDescription } from './sendTask'
import { showTasks, showTasksDescription } from './showTasks'

class command {
  func: (ctx: any) => Promise<void>
  name: string

  constructor (func: (ctx: any) => Promise<void>, name: string) {
    this.func = func,
    this.name = name
  }
}

export const commands = [
  new command(start, "start"),
  new command(help, "help"),
  new command(groupsList, "groups_list"),
  new command(addTask, "add_task"),
  new command(addGroup, "add_group"),
  new command(joinGroup, "join_group"),
  new command(acceptJoin, "accept_join"),
  new command(showCandidates, "show_candidates"),
  new command(addMod, "add_mod"),
  new command(accept, "accept"),
  new command(decline, "decline"),
  new command(sendTask, "send_task"),
  new command(showTasks, "show_tasks")
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
  showTasksDescription
]