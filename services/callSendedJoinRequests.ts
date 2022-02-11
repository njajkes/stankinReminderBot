import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { groupModel } from "../models/groups";
import { userModel } from "../models/users";

// regular notifications for group admins about new join requests  
export default async function callSendedJoinRequests(bot: Telegraf<Context<Update>>) {
  const candidates = await userModel.find({role: "sended"})
  if (!candidates) { return }
  const admins: object = {}

  for (let candidate of candidates) {
    const group = await groupModel.findOne({groupName: candidate.groupName})
    if (!admins[group.adminID]) {
      admins[group.adminID] = {}
    }
    if (!admins[group.adminID][group.groupName]) {
      admins[group.adminID][group.groupName] = [candidate.username]
    } else {
      admins[group.adminID][group.groupName].push(candidate.username)
    }
    candidate.role = "pending"
    await candidate.save()
  }

  let i = 0
  for (let admin of Object.getOwnPropertyNames(admins)) {
    let msg: string = "Привет! Список жаждущий вступления в ваши группы:"
    const adminGroups = Object.getOwnPropertyNames(admins[admin])
    adminGroups.forEach(group => {
      msg += '\n\n' + group + ':'
      const candidates: string[] = admins[admin][group]
      let i = 1
      candidates.forEach(candidate => {
        msg += '\n' + i.toString() + '. @' + candidate
        i++
      })
    })
    bot.telegram.sendMessage(+admin, msg)
    if (i++ >= 30) {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      i = 0
    }
  }
}