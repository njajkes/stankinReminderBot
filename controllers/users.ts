import { userModel } from "../models/users"

export async function createNewUser(uid: number, username: string): Promise<void> {
  await userModel.create({
    uid: uid,
    username: username,
    groupID: 3,
    role: "member"
  })
}

export async function findUserByUID(uid: number) {
  const user = await userModel.findOne({uid: uid})
  return user
}