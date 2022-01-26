import { taskModel } from "../models/tasks"

export async function createTask(uid: number, disc: string, time: number, desc:string) {
  await taskModel.create({
    uid: uid,
    discipline: disc,
    time: time,
    description: desc,
    status: "waiting"
  })
}

export async function findPendingTasks(time:number) {
  const tasks = await taskModel.find({
    time: {$lt: time},
    status: "waiting"
  })
  return tasks
}