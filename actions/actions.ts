import { Action } from "./action";
import { SendTaskChoice } from "./sendTaskChoice";
import { DoneTaskAction } from "./done";
import { EditsTaskTime } from "./editTaskTime";
import { FailedTaskAction } from "./failed";
import { Reschedules } from "./reschedule";
import { ScheduleChange } from "./scheduleChange";
import { GroupListActions } from "./groupListMenu";
import { HelpActions } from "./helpAction";
import { ShowTasksActions } from "./showTasksActions";

export const actions: Action[] = [
  DoneTaskAction,
  FailedTaskAction,
  ...SendTaskChoice,
  ...EditsTaskTime,
  ...Reschedules,
  ...ScheduleChange,
  ...GroupListActions,
  ...HelpActions,
  ...ShowTasksActions
]