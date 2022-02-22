import { getStankinGroups } from "../utils/getStankinGroups"
import { command } from "./command"
import { comDesc } from "./comDesc"
import formingScheludeMessage from "../utils/formingScheduleMessage"
import { SCHEDULE_EDIT_DEFAULT } from "../utils/markups"

async function schedule(ctx) {
  const query = ctx.message.text.split(' ')[1]
  if (!(await getStankinGroups()).includes(query)) {
    ctx.telegram.sendMessage(ctx.message.chat.id, "Эта группа не является группой МГТУ \"СТАНКИН\", поэтому мы не можем дать вам расписание")
    return
  }
  let result: string = await formingScheludeMessage({ groupName: query })
  ctx.telegram.sendMessage(ctx.message.chat.id, result, SCHEDULE_EDIT_DEFAULT)
}

const scheduleDescription = new comDesc("/schedule [group_name]", "выводит меню расписания группы", 0, "group_name - название группы МГТУ \"СТАНКИН\", расписание которой вы хотите посмотреть")

export const Schedule = new command(schedule, "schedule", scheduleDescription)