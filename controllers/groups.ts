import {groupModel} from "../models/groups"

export async function getAllGroups() {
  const groups = await groupModel.find({})
  return groups
}

export async function getAllVisibleGroups() {
  const visibleGroups = await groupModel.find({tracked: true})
  return visibleGroups
}

export async function getGroupByGID(gid:number) {
  const group = await groupModel.findOne({groupID: gid})
  return group
}

export async function createGroup(gName:string, tracked: boolean, from: {id: number, username: string}) {
  await groupModel.create({
    groupName: gName,
    tracked: tracked,
    adminID: from.id,
    adminUsername: from.username
  })
}