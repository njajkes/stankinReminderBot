import { Markup } from "telegraf"

export const TASK_DEFAULT = {
  inline_keyboard: [
    [{text: "✅ Сделано", callback_data: "DONE_TASK_ACTION"}, {text: "❌ Провалено", callback_data: "FAILED_TASK_ACTION"}],
    [{text: "🕔 Изменить время", callback_data: "EDIT_TASK_TIME_ACTION"}]
  ]
}

export const EDIT_TASK_TIME_1_PAGE = {
  inline_keyboard: [
    [{text:"🕔 00:05", callback_data: "RESCH_5MIN_ACTION"},{text:"🕔 00:10", callback_data: "RESCH_10MIN_ACTION"},{text:"🕔 00:15", callback_data: "RESCH_15MIN_ACTION"}],
    [{text:"🕔 00:30", callback_data: "RESCH_30MIN_ACTION"},{text:"🕔 00:45", callback_data: "RESCH_45MIN_ACTION"},{text:"-->", callback_data: "EDIT_TASK_TIME_2_ACTION"}]
  ]
}

export const EDIT_TASK_TIME_2_PAGE = {
  inline_keyboard: [
    [{text:"<--", callback_data: "EDIT_TASK_TIME_ACTION"},{text:"🕔 01:00", callback_data: "RESCH_1HOUR_ACTION"},{text:"🕔 03:00", callback_data: "RESCH_3HOUR_ACTION"}],
    [{text:"🕔 06:00", callback_data: "RESCH_6HOUR_ACTION"},{text:"🕔 12:00", callback_data: "RESCH_12HOUR_ACTION"},{text:"🕔 24:00", callback_data: "RESCH_24HOUR_ACTION"}]
  ]
}

export const SCHEDULE_EDIT_DEFAULT = Markup.inlineKeyboard([
  Markup.button.callback("1 день", "SCHEDULE_CHANGE_1D"),
  Markup.button.callback("3 дня", "SCHEDULE_CHANGE_3D"),
  Markup.button.callback("7 дней", "SCHEDULE_CHANGE_7D")
])

export const SEND_TASK = Markup.inlineKeyboard([
  Markup.button.callback("✅ Принять", "ACCEPT_TASK_ACTION"),
  Markup.button.callback("❌ Отклонить", "DECLINE_TASK_ACTION")
])

export const FIRST_GROUPS_LIST = Markup.inlineKeyboard([
  Markup.button.callback("-->", "GROUPS_LIST_NEXT")
])

export const MED_GROUPS_LIST = Markup.inlineKeyboard([
  Markup.button.callback("<--", "GROUPS_LIST_PREV"),
  Markup.button.callback("-->", "GROUPS_LIST_NEXT")
])

export const LAST_GROUPS_LIST = Markup.inlineKeyboard([
  Markup.button.callback("<--", "GROUPS_LIST_PREV")
])

export const HELP_MENU = Markup.inlineKeyboard([
  [
    Markup.button.callback("Для всех", "HELP_ALL")
  ],
  [
    Markup.button.callback("Для модераторов", "HELP_MOD"),
    Markup.button.callback("Для админов", "HELP_ADM")
  ]
])

export const SHOW_TASKS = Markup.inlineKeyboard([
  [
    Markup.button.callback("Ждут принятия", "SHOW_TASKS_W84A"),
    Markup.button.callback("Ждут выполнения", "SHOW_TASKS_W8ING")
  ]
])