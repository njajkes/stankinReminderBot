import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { groupModel } from "../models/groups";
import { userModel } from "../models/users";

export async function callSendedJoinRequests(bot:Telegraf<Context<Update>>) {
  const candidates = await userModel.find({role: "sended"})
  const admins: object = {}

  candidates.forEach(async (candidate) => {
    const group = await groupModel.findOne({_id: candidate.groupID})
    if (!admins[group.adminID]) {
      admins[group.adminID] = [candidate.uid]
    } else {
      admins[group.adminID].push(candidate.uid)
    }
    candidate.role = "pending"
    await candidate.save()
  })
  
  for (let k of Object.getOwnPropertyNames(admins)) {

  }
}