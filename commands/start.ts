import { findUserByUID, newUser } from "../controllers/users"
import { comDesc } from "./commandDescription"

export async function start(ctx) {
  const user = await findUserByUID(ctx.from.id)
  console.log(user)
  if (!user) {
    await newUser(ctx.from.id, 1, "member")
    ctx.telegram.sendMessage(ctx.message.chat.id, 
      `Привет!\nЭто телеграм-бот таск-трекер для студентов МГТУ "СТАНКИН".\nДля начала работы напиши /help для вывода команд бота.`)
  }
  else {
    ctx.telegram.sendMessage(ctx.message.chat.id, 'И тебе снова привет! Чтобы узнать команды бота, напиши /help')
  }
}

export const startDescription = new comDesc("/start", "начало работы и приветственное сообщение;")