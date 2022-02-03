import { taskModel } from "../models/tasks"
import { timeValidation } from "../utils/timeValidation"

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

// query = [DD, MM, YYYY, hh:mm, Discipline, ...Description]
export async function taskValidation(query: string[]): Promise<boolean> {
  if (query.length < 6) return false

  const query_time: string[] = query.slice(0, 4);
  [ query_time[0], query_time[1] ] = [ query_time[1], query_time[0] ]
  if (!timeValidation(query_time)) return false

  return true
}