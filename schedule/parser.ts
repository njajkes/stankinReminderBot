import * as fs from "fs/promises"
import * as path from "path"
import dateStringify from "../utils/dateStringify"

interface DisciplineSchedule {
  title: string,
  lecturer: string,
  type: string,
  classroom: string,
  subgroup: string,
  time: {
    start: string,
    end: string
  },
  dates: [
    {
      frequency: string,
      date: string
    }
  ]
}

async function executeParser() {
  const jsons = await fs.readdir(".\\assets")
  const output = {}
  const time = Date.now()
  for (let groupFile of jsons) {
    const file = await fs.readFile(".\\assets\\" + groupFile)
    const groupName = path.basename(".\\assets\\"+ groupFile, ".json")
    const scheduleObject: Array<DisciplineSchedule> = JSON.parse(file.toString())
    scheduleObject.forEach(el => {
      const lecturer = el.lecturer == "" ? "Неизвестно" : el.lecturer
      
      const classroom = el.classroom == "" ? "на дистанте" : el.classroom == "Стадион" ? "на стадионе" : "каб. " + el.classroom;

      const type = el.type == "Lecture" ? "Лекция" : el.type == "Seminar" ? "Семинар" : el.subgroup == "A" ? "Лаб. для А" : "Лаб. для Б";

      const formatedString = el.title + " (" + type + "): " + lecturer + " (" + classroom + ") "
      const time = el.subgroup != "Common" ? `${el.time.start}-${el.time.end}${el.subgroup}` : `${el.time.start}-${el.time.end}`
      const dates = datesConverter(el.dates)
      
      dates.forEach(date => {
        if (!output[date]) {
          output[date] = {}
        }
        if (!output[date][groupName]) {
          output[date][groupName] = {}
        }
        output[date][groupName][time] = formatedString
      })
    })
  }
  await fs.writeFile(".\\parsedSchedules.json", JSON.stringify(output, null, '\t'))
  console.log(Date.now() - time)
}
executeParser()

function datesConverter( dates: [ { frequency: string, date: string } ] ): string[] {
  const result: Array<string> = []

  for (let el of dates) {
    if (el.frequency == "once") {
      const dateNormalize = new Date(el.date.split(".").join(' ')) // YYYY.MM.DD string to Date 
      result.push(dateStringify(dateNormalize)) // push as YYYY MM DD, MM and DD not started with zero-symbol (like 2022 1 1)
    } 
    else {
      const [start, stop] = el.date.split("-").map(k => new Date(k.split('.').join(' '))) // YYYY.MM.DD-YYYY.MM.DD string to lections start and stop  
      const c = el.frequency == "every" ? 1 : 2 // every == 7*1, throughout == every 2 week == 7*2
      result.push(dateStringify(start))

      let k = start
      while (+k != +stop) {
        k = new Date(+new Date(k) + 86400000 * 7 * c)
        result.push(dateStringify(k)) // to normal string
      }
    }
  }
  return result 
}