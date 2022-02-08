"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.addTaskDescription = exports.addTask = void 0;
var tasks_1 = require("../../controllers/tasks");
var constants_1 = require("../../utils/constants");
var comDesc_1 = require("../comDesc");
function addTask(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var query, time, discipline, description;
        var _a;
        return __generator(this, function (_b) {
            query = ctx.update.message.text
                .split('/').join(' ')
                .split('-').join(' ')
                .split('.').join(' ')
                .split(' ').slice(2);
            if (!(0, tasks_1.taskValidation)(query)) {
                ctx.telegram.sendMessage(ctx.message.chat.id, constants_1.SYNTAX_ERR_MESSAGE + "add_task");
                return [2 /*return*/];
            }
            _a = [query[1], query[0]], query[0] = _a[0], query[1] = _a[1];
            time = (new Date(query.slice(0, 4).join(' '))).getTime();
            discipline = query[4].split('_').join(' ');
            description = query.slice(5).join(' ');
            (0, tasks_1.createTask)(ctx.from.id, discipline, time, description);
            ctx.telegram.sendMessage(ctx.message.chat.id, "Задача успешно добавлена!");
            return [2 /*return*/];
        });
    });
}
exports.addTask = addTask;
exports.addTaskDescription = new comDesc_1.comDesc("/add_task [time] [discipline] [description]", "добавить персональную задачу", 0, "time - время в формате \"DD MM YYYY hh:mm\"", "discipline - содержит предмет, по поводу которого срабатывает напоминание.", "description - содержит описание задачи", "ВАЖНО: При указании предмета, пробелы заменяются нижними подчеркиваниями для успешного парса строки", "Пример: /add_task 01 01 2025 15:55 Математическая_логика_и_теория_алгоритмов Сдать контрольную");
