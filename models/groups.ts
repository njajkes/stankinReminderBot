import {Schema, model} from "mongoose"

export interface GroupInfo {
  groupID: number,
  groupName: string,
  tracked: boolean,
  fatherName?: string,
  adminID: number,
  adminUsername: string
}

export const groupSchema = new Schema<GroupInfo>({
  groupID: {type: Number, required: true},
  groupName: {type: String, required: true},
  tracked: {type: Boolean, required: true},
  fatherName: {type: String},
  adminID: {type: Number, required: true},
  adminUsername: {type: String, required: true}
})

export const groupModel = model("group", groupSchema)