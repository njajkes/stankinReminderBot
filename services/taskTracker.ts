import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { findPendingTasks } from "../controllers/tasks";

export async function taskTracker(bot: Telegraf<Context<Update>>) {
  const tasks = await findPendingTasks(Date.now());
  tasks.forEach(async (task) => {
    bot.telegram.sendMessage(task.uid, `Предмет: ${task.discipline}\nОписание: ${task.description}`);
    task.status = 'pending';
    await task.save();
  });
}
