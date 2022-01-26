import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { groupModel } from "../models/groups";
import { userModel } from "../models/users";

// regular notifications for group admins about new join requests  
export async function callSendedJoinRequests(bot:Telegraf<Context<Update>>) {
  const candidates = await userModel.find({role: "sended"})
  const admins: object = {}

  // 
  candidates.forEach(async (candidate) => {
    const group = await groupModel.findOne({groupName: candidate.groupName})
    if (!admins[group.adminID]) {
      admins[group.adminID] = [candidate.username]
    } else {
      admins[group.adminID].push(candidate.username)
    }
    candidate.role = "pending"
    await candidate.save()
  })
  
  const messages = new Map()
  for (let k of Object.getOwnPropertyNames(admins)) {
    // todo: add message-maker
  }

  // todo: add mailing
}