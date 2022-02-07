import { AutoIncrementID } from "@typegoose/auto-increment"
import { Schema, model } from "mongoose"

export interface GroupInfo {
  _id: number,
  groupName: string,
  tracked: boolean,
  fatherName?: string,
  adminID: number,
  adminUsername: string,
  description?: string,
  contacts?: string,
  daily?: string
}

export const groupSchema = new Schema<GroupInfo>({
  _id: {type: Number},
  groupName: {type: String, required: true, unique: true},
  tracked: {type: Boolean, required: true},
  fatherName: {type: String},
  adminID: {type: Number, required: true},
  adminUsername: {type: String, required: true},
  description: {type: String},
  contacts: {type: String},
  daily: {type: String}
})

groupSchema.plugin(AutoIncrementID, {})

export const groupModel = model("group", groupSchema)