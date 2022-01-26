import { groupModel } from "../models/groups";
import { userModel } from "../models/users";

export async function joinGroup(ctx) {
  const query = ctx.message.text.split(' ').slice(1)
  const group = await groupModel.findOne({groupName: query[0]})
  // todo
  await userModel.create({
    uid: ctx.from.id,

  })
}