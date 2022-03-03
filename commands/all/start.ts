import { findUserByUID, createNewUser } from "../../controllers/users"
import { comDesc } from '../comDesc'
import { command } from "../command"

async function start(ctx): Promise<void> {
  const user = await findUserByUID(ctx.from.id)
  if (!user) {
    await createNewUser(ctx.from.id, ctx.from.username)
    ctx.telegram.sendMessage(ctx.message.chat.id, 
      `Привет!\nЭто телеграм-бот таск-трекер для студентов МГТУ "СТАНКИН".\nДля начала работы напиши /help для вывода команд бота.`)
  }
  else {
    ctx.telegram.sendMessage(ctx.message.chat.id, 'И тебе снова привет! Чтобы узнать команды бота, напиши /help')
  }
}
const startDescription = new comDesc("/start", "начало работы и приветственное сообщение", 0) 

export const Start = new command(start, "start", startDescription)