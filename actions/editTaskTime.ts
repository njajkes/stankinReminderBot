import { Action } from "./action";

async function editTaskTime(ctx) {
  ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [{text:"🕔 00:05", callback_data: "RESCH_5MIN_ACTION"},{text:"🕔 00:10", callback_data: "RESCH_10MIN_ACTION"},{text:"🕔 00:15", callback_data: "RESCH_15MIN_ACTION"}],
      [{text:"🕔 00:30", callback_data: "RESCH_30MIN_ACTION"},{text:"🕔 00:45", callback_data: "RESCH_45MIN_ACTION"},{text:"-->", callback_data: "EDIT_TASK_TIME_2_ACTION"}]
    ]
  })
}

async function editTaskTime2(ctx) {
  ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [{text:"<--", callback_data: "EDIT_TASK_TIME_ACTION"},{text:"🕔 01:00", callback_data: "RESCH_1HOUR_ACTION"},{text:"🕔 03:00", callback_data: "RESCH_3HOUR_ACTION"}],
      [{text:"🕔 06:00", callback_data: "RESCH_6HOUR_ACTION"},{text:"🕔 12:00", callback_data: "RESCH_12HOUR_ACTION"},{text:"🕔 24:00", callback_data: "RESCH_24HOUR_ACTION"}]
    ]
  })
}

const EditTaskTime = new Action(editTaskTime, "EDIT_TASK_TIME_ACTION")
const EditTaskTime2 = new Action(editTaskTime2, "EDIT_TASK_TIME_2_ACTION")

export const EditsTaskTime = [EditTaskTime, EditTaskTime2]