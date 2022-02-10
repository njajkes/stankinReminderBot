/**
 * Parse ms since 01.01.1970 00:00 to format DD/MM/YYYY hh:mm
 * @param time time like Date.now()
 * @returns string like "DD/MM/YYYY hh:mm"
 */
export function timeToString(time: number): string {
  const date = new Date(time)

  return `${date.getDay()+1}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
} 