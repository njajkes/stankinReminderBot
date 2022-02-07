import { commandDescriptions, comDesc } from './commands'

export const helpDescription = new comDesc("/help [flag/command]", "все команды и их синтаксис", 0, "flag - необязательный атрибут, подробнее: /help -h", "command - необязательный атрибут, ")
export const helpFlagsDescription = new comDesc("/help [flag]", "все команды и их синтаксис", 1, "flag - необязательный атрибут, устанавливает флаг, по которому будут выводиться команды", "Если флаг не был установлен, выводятся команды, доступные всем пользователям", "-h - выводит все флаги :)", "-adm - выводит команды админа группы", "-mod - выводит команды модератора группы")

export async function help(ctx) {
  const descriptions: comDesc[] = commandDescriptions
  let perm = 0, result: string
  const query: string | undefined = ctx.update.message.text.split(' ')[1]
  let com: string
  if (query) {
    switch (query) {
      case '-mod':
        perm = 3
        break
      case '-adm':
        perm = 2
        break
      case '-h':
        perm = 1
        break
      default:
        com = query
    }
  }
  result = helpMessageForming(descriptions, perm, com)
  ctx.telegram.sendMessage(ctx.message.chat.id, result)
}

function helpMessageForming(commandsDescriptions: comDesc[], permissionLevel: number, command?: string) {
  let result: string, i = 1
  if (command) {
    result = 'Информация по команде:'
    const com = commandsDescriptions.find(el => el.commandName.slice(1).split(' ')[0] == command)
    if (com) {
      const {commandName, commandDescription, args} = com
      result += '\n' + commandName + ' — ' + commandDescription
      if (args.length > 0) {
        args.forEach( argument => {
          result += '\n    ' + argument
        })
      }
      return result
    }
  }
  result = 'Список команд: '
  const descs = commandsDescriptions.filter( desc => desc.permissions == permissionLevel)  
  descs.forEach( description => {
    const {commandName, commandDescription, args} = description
    result += '\n' + i.toString()+ '. ' + commandName + ' — ' + commandDescription
    i++
  })
  return result
}