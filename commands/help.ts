import { addTaskDescription } from './addTask'
import { groupListDescription } from './groupsList'
import { startDescription } from './start'

export async function help(ctx) {
  let result = 'Список команд:\n'
  const descriptions = [
    startDescription,
    groupListDescription,
    addTaskDescription
  ]
  descriptions.forEach( description => {
    const {commandName, commandDescription, args} = description
    result += '\n' + commandName + ' — ' + commandDescription
    if (args.length > 0) {
      args.forEach( argument => {
        result += '\n    ' + argument
      })
    }
  })
  ctx.telegram.sendMessage(ctx.message.chat.id, result)
}