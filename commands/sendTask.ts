//stub for /send_task command

import { comDesc } from "./commandDescription";

export const acceptTaskDescription = new comDesc(
  "/send_task [group] [time] [description] [discipline]", 
  "отправить задачу участникам группы", 
  3, 
  "group_name - группа, в которую вы хотите отправить задачу",
  "time - время в формате \"DD MM YYYY hh:mm\"",
  "description - содержит описание задачи",
  "discipline - содержит предмет, по поводу которого срабатывает напоминание. \n    ВАЖНО: При указании предмета, пробелы заменяются нижними подчеркиваниями для успешного парса строки",
  "Пример: /add_task клан_крутые_гремлины 01 01 2023 15:45 покушать Другое")