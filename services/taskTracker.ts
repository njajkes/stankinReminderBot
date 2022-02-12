import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { findPendingTasks } from "../controllers/tasks";

export default async function taskTracker(bot: Telegraf<Context<Update>>) {
  const tasks = await findPendingTasks(Date.now());
  let i = 1
  for (let task of tasks) {
    bot.telegram.sendMessage(task.uid, `Предмет: ${task.discipline}\nОписание: ${task.description}`);
    task.status = 'pending';
    await task.save();
    if (i++ >= 24) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      i = 1
    }
  };
}
