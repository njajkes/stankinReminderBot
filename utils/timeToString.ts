/**
 * Parse ms since 01.01.1970 00:00 to format DD/MM/YYYY hh:mm
 * @param time time like Date.now()
 * @returns string like "DD/MM/YYYY hh:mm"
 */
 export function timeToString(time: number): string {
  const date = new Date(time)
  date.setHours(date.getHours() + 3)
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours() < 10 ?  '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ?  '0' + date.getMinutes() : date.getMinutes()}`
} 