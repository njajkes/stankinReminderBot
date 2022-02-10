"use strict";
exports.__esModule = true;
exports.NOT_ALLOWED_ROLES = exports.ALLOWED_ROLES = exports.USER_NOT_FOUND_ERR_MESSAGE = exports.PERM_ERR_MESSAGE = exports.ARG_LEN_ERR_MESSAGE = exports.SYNTAX_ERR_MESSAGE = void 0;
exports.SYNTAX_ERR_MESSAGE = "Нарушен синтаксис команды 🤕\nПожалуйста, проверьте корректность введённых данных\nПодробнее: /help ";
exports.ARG_LEN_ERR_MESSAGE = "Введено неверное количество аргументов 🤕\nПожалуйста, проверьте корректность введённых данных\nПодробнее: /help ";
exports.PERM_ERR_MESSAGE = "Группа, которую вы указали в команде, не найдена, либо вы не являетесь в ней администратором 🤕\nПожалуйста, проверьте корректность введённых данных\nПодробнее: /help ";
exports.USER_NOT_FOUND_ERR_MESSAGE = "Такой пользователь не найден 🤕\nПожалуйста, проверьте корректность введённых данных\nПодробнее: /help ";
exports.ALLOWED_ROLES = ["member", "moderator", "admin"];
exports.NOT_ALLOWED_ROLES = ["pending", "sended", "banned"];
