import { counterModel } from "../models/counters"
import { taskModel } from "../models/tasks"

export async function createTask(uid: number, disc: string, time: number, desc:string) {
  const {count} = await counterModel.findById("taskID")
  const task = new taskModel({
    id: count,
    uid: uid,
    discipline: disc,
    time: time,
    description: desc,
    status: "waiting"
  })
  await task.save()
}

export async function findPendingTasks(time:number) {
  const tasks = await taskModel.find({
    time: {$lt: time},
    status: "waiting"
  })
  return tasks
}