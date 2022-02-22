import { Action } from "./action";
import { DoneTaskAction } from "./done";
import { EditsTaskTime } from "./editTaskTime";
import { FailedTaskAction } from "./failed";
import { Reschedules } from "./reschedule";
import { ScheduleChange } from "./scheduleChange";

export const actions: Action[] = [
  DoneTaskAction,
  FailedTaskAction,
  ...EditsTaskTime,
  ...Reschedules,
  ...ScheduleChange
]