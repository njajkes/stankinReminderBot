export function parseCallbackQuery(ctx, options?: {list?: boolean, task?: boolean}) {
  const taskIDregexp = /Идентификатор задачи: (\d{0,})/m
  
  const {message} = ctx.update.callback_query;
  const npageRegexp = /Номер страницы: (\d{0,}) из (\d{0,})/m

  let nPageNow: number
  let nPageAll: number
  let taskID: number

  if (options?.list) {
    [, nPageNow, nPageAll] = message.text.match(npageRegexp)?.map(el=>+el)
  }
  if (options?.task) {
    [, taskID] = message.text.match(taskIDregexp)?.map(el=>+el)
  }
  
  return {taskID, message, nPageNow, nPageAll}
}