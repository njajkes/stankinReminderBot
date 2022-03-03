import { comDesc } from "../../commands/comDesc"
import { commands } from "../../commands/commands"


export function helpMessageForming(permissionLevel: number, command?: string) {
  const helpFlagsDescription = new comDesc("/help [flag]", "все команды и их синтаксис", 1, "flag - необязательный атрибут, устанавливает флаг, по которому будут выводиться команды", "Если флаг не был установлен, выводятся команды, доступные всем пользователям", "-h - выводит все флаги :)", "-adm - выводит команды админа группы", "-mod - выводит команды модератора группы")
  const commandsDescriptions: comDesc[] = commands.map(com => com?.description)
  commandsDescriptions.push(helpFlagsDescription)

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
  const descs = commandsDescriptions.filter( desc => desc?.permissions == permissionLevel)  
  descs.forEach( description => {
    const {commandName, commandDescription} = description
    result += '\n' + i.toString()+ '. ' + commandName + ' — ' + commandDescription
    i++
  })
  return result
}