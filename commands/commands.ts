import { Start } from './start'
import { Help } from './help'
import { GroupList } from './all/groupsList'
import { AddTask } from './task_management/addTask'
import { AddGroup } from './all/addGroup'
import { AddMod } from './group_management/addMod'
import { SendTask } from './group_management/sendTask'
import { ShowCandidates } from './group_management/showCandidates'
import { AcceptJoin } from './members/acceptJoin'
import { GroupInfo } from './members/groupInfo'
import { JoinGroup } from './members/joinGroup'
import { Accept } from './task_management/accept'
import { Decline } from './task_management/decline'
import { ShowTasks } from './task_management/showTasks'
import { SetInfo } from './group_management/description/setInfo'
import { DeleteInfo } from './group_management/description/delInfo'
import { About } from './about'
import { DeleteDaily } from './group_management/daily/delDaily'
import { SetDaily } from './group_management/daily/setDaily'
import { Ban } from './group_management/ban'
import { Kick } from './group_management/kick'
import { Unban } from './group_management/unban'
import { DeclineJoin } from './members/declineJoin'
import { SendAll } from './group_management/sendAll'
import { Sub } from './members/sub'
import { Unsub } from './members/unsub'
import { Schedule } from './schedule'

export const commands = [
  Start,
  Help,
  About,
  GroupList,
  JoinGroup,
  GroupInfo,
  AddTask,
  AddMod,
  AddGroup,
  SendTask,
  SendAll,
  ShowCandidates,
  ShowTasks,
  AcceptJoin,
  DeclineJoin,
  Accept,
  Decline,
  SetInfo,
  DeleteInfo,
  SetDaily,
  DeleteDaily,
  Kick,
  Ban,
  Unban,
  Sub,
  Unsub,
  Schedule
]