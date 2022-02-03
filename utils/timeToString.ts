export function timeToString(time: number): string {
  const date = new Date(time)

  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
} 