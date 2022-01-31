//stub for /accept_task command

import { comDesc } from "./commandDescription";

export const acceptTaskDescription = new comDesc("/accept_task [task_id]", "принять задачу, которую вам отправили", 0, "task_id - идентификатор задачи", "Пример: /accept_task 993")