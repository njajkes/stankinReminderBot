import { userModel } from "../models/users"

export async function newUser(uid: number, groupID: number, role: string): Promise<void> {
  const user = new userModel({
    uid: uid,
    groupID: groupID,
    role: role
  })
  await user.save((err) => console.error(err))
}

export async function findUserByUID(uid: number) {
  const user = await userModel.findOne({uid: uid})
  return user
}