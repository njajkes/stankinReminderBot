export function timeToString(time: number): string {
  const date = new Date(time)

  return `${date.getDay()+1}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
} 