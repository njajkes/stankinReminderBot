import { userModel } from "../models/users"

export async function createUser(uid: number, username: string, groupID: number, role: string): Promise<void> {
  userModel.create({
    uid: uid,
    username: username,
    groupID: groupID,
    role: role
  })
}

export async function findUserByUID(uid: number) {
  const user = await userModel.findOne({uid: uid})
  return user
}