import {Schema, model} from "mongoose"
import { counterModel } from "./counters"

export interface Task {
  id: number,
  uid: number,
  discipline: string,
  time: number,
  description: string,
  status: string
}

export const taskSchema = new Schema<Task>({
  id: {type: Number, required: true},
  uid: {type: Number, required: true},
  discipline: {type: String, required: true},
  time: {type: Number, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true}
})

taskSchema.pre("save", async next => {
  const taskCounter = await counterModel.findById("taskID")
  taskCounter.count++
  await taskCounter.save() 
})

export const taskModel = model('task', taskSchema)