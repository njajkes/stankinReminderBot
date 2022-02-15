import { comDesc } from "./comDesc";
import { command } from "./command";

async function about(ctx) {
  ctx.telegram.sendMessage(ctx.message.chat.id, "Название бота: Stankin Reminder\nПрямая ссылка: https://t.me/StankinRemindersBot?start\nВерсия бота: 0.2.6\nСоздатель бота: @najkes\n\nОтдельная благодарность Николаю Верещагину за предоставление возможности сделать расписание")
}

const aboutDescription = new comDesc("/about", "обратная связь и информация о боте", 0)

export const About = new command(about, "about", aboutDescription)