/**
 * Validation uses in creating or editing task 
 * @param time Array of string like ["DD", "MM", "YYYY", "hh:mm"]
 * @returns true if valid or false if invalid
 */

export function timeValidation(time:string[]): boolean {
  const timeRegexp = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/
  if (!timeRegexp.test(time[3]) || isNaN(Date.parse(time.slice(0, 3).join('/')))) {
    return false
  }
  return true
}