import { AutoIncrementID } from "@typegoose/auto-increment"
import {Schema, model} from "mongoose"

export interface Task {
  _id: number,
  uid: number,
  discipline: string,
  time: number,
  description: string,
  status: string // done, waiting, pending, w8ing4accept, decline
}

export const taskSchema = new Schema<Task>({
  _id: {type: Number},
  uid: {type: Number, required: true},
  discipline: {type: String, required: true},
  time: {type: Number, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true}
})
taskSchema.plugin(AutoIncrementID, {})

export const taskModel = model('task', taskSchema)