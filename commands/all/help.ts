import { helpMessageForming } from '../../utils/messageForming/helpMessageForming'
import { HELP_MENU } from '../../utils/markups'
import { comDesc } from '../comDesc'
import { command } from '../command'

const helpDescription = new comDesc("/help [flag/command]", "все команды и их синтаксис", 0, "flag - необязательный атрибут, подробнее: /help -h", "command - необязательный атрибут, ")

async function help(ctx) {
  let perm = 0, result: string
  const query: string | undefined = ctx.update.message.text.split(' ')[1]
  let com: string
  if (query) {
    switch (query) {
      case '-xd':
        perm = 99;
        break;
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
  result = helpMessageForming(perm, com)
  ctx.telegram.sendMessage(ctx.message.chat.id, result, HELP_MENU)
}

export const Help = new command(help, "help", helpDescription)