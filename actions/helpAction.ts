import { helpMessageForming } from "../utils/messageForming/helpMessageForming";
import { HELP_MENU } from "../utils/markups";
import { parseCallbackQuery } from "../utils/parseCallbackQuery";
import { Action } from "./action";

function helpActionsMaker(type) {
  let perm = 0

  if (type == 'mod') perm = 2
  else if (type == 'adm') perm = 3

  const result = helpMessageForming(perm)

  return async function (ctx) {
    const {message} = parseCallbackQuery(ctx)
    if (message.text == result) return
    ctx.editMessageText(result, HELP_MENU)
  }
}

const AllHelpAction = new Action(helpActionsMaker("all"), "HELP_ALL")
const ModHelpAction = new Action(helpActionsMaker("mod"), "HELP_MOD")
const AdmHelpAction = new Action(helpActionsMaker("adm"), "HELP_ADM")

export const HelpActions = [AllHelpAction, ModHelpAction, AdmHelpAction]