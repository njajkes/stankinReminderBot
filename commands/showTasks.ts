//stub for /show_tasks command

import { comDesc } from "./commandDescription";

export const showTasksDescription = new comDesc("/showTasks", "посмотреть свои задачи", 0, "Возвращает как задачи, которые вы приняли, так и те, которые ожидают одобрения/отклонения")