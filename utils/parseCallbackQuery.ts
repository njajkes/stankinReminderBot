export function parseCallbackQuery(ctx) {
  const regexp = /\d+/
  const {message} = ctx.update.callback_query

  const [taskID] = message.text.match(regexp).map(el=>+el)

  return {taskID, message}
}