import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { findPendingTasks } from "../controllers/tasks";

export default async function taskTracker(bot: Telegraf<Context<Update>>) {
  const tasks = await findPendingTasks(Date.now());
  let i = 1
  for (let task of tasks) {
    bot.telegram.sendMessage(task.uid, `Идентификатор задачи: ${task._id}\nПредмет: ${task.discipline}\nОписание: ${task.description}`, {
      reply_markup: {
        inline_keyboard: [
          [{text: "✅", callback_data: "DONE_TASK_ACTION"}, {text: "❌", callback_data: "FAILED_TASK_ACTION"}],
          [{text: "🕔 Изменить время", callback_data: "EDIT_TASK_TIME_ACTION"}]
        ]
      }
    });
    task.status = 'pending';
    await task.save();
    if (i++ >= 24) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      i = 1
    }
  };
}
