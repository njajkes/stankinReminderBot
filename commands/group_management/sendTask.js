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
exports.sendTaskDescription = exports.sendTask = void 0;
var tasks_1 = require("../../controllers/tasks");
var groups_1 = require("../../models/groups");
var tasks_2 = require("../../models/tasks");
var users_1 = require("../../models/users");
var constants_1 = require("../../utils/constants");
var commands_1 = require("../commands");
function sendTask(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var query, groupQuery, group, user, taskQuery, time, discipline, description, groupMembers;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = ctx.message.text.split(' ').slice(1);
                    groupQuery = query[0];
                    return [4 /*yield*/, groups_1.groupModel.findOne({ groupName: groupQuery })];
                case 1:
                    group = _a.sent();
                    return [4 /*yield*/, users_1.userModel.findOne({ uid: ctx.from.id, groupName: groupQuery, $or: [{ role: "moderator" }, { role: "admin" }] })];
                case 2:
                    user = _a.sent();
                    if (query.length < 7) {
                        ctx.telegram.sendMessage(ctx.message.chat.id, constants_1.ARG_LEN_ERR_MESSAGE + "send_task");
                        return [2 /*return*/];
                    }
                    if (!group || !user || (user.role !== "moderator" && user.role !== "admin")) {
                        ctx.telegram.sendMessage(ctx.message.chat.id, "Группа не найдена либо вы не являетесь в ней модератором или админом 🤕");
                        return [2 /*return*/];
                    }
                    taskQuery = query.slice(1);
                    if (!(0, tasks_1.taskValidation)(taskQuery)) {
                        ctx.telegram.sendMessage(ctx.message.chat.id, constants_1.SYNTAX_ERR_MESSAGE + "send_task");
                        return [2 /*return*/];
                    }
                    time = (new Date(taskQuery.slice(0, 4).join(' '))).getTime();
                    discipline = taskQuery[4].split('_').join(' ');
                    description = taskQuery.slice(5).join(' ');
                    return [4 /*yield*/, users_1.userModel.find({ groupName: groupQuery, $or: [{ role: "member" }, { role: "moderator" }, { role: "admin" }] })];
                case 3:
                    groupMembers = _a.sent();
                    groupMembers.forEach(function (member) { return __awaiter(_this, void 0, void 0, function () {
                        var task;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tasks_2.taskModel.create({
                                        uid: member.uid,
                                        description: description,
                                        discipline: discipline,
                                        time: time,
                                        status: "w8ing4accept"
                                    })];
                                case 1:
                                    task = _a.sent();
                                    ctx.telegram.sendMessage(member.uid, "\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430 \u043E\u0442 ".concat(group.groupName, "!\ntask_id: ").concat(task._id, "\n\n\u041F\u0440\u0435\u0434\u043C\u0435\u0442: ").concat(discipline, "\n\n\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435: ").concat(description, "\n\n\u0427\u0442\u043E\u0431\u044B \u043F\u0440\u0438\u043D\u044F\u0442\u044C, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 /accept ").concat(task._id, "\n\u0427\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 /decline ").concat(task._id));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    ctx.telegram.sendMessage(ctx.message.chat.id, "\u0417\u0430\u0434\u0430\u0447\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0440\u0430\u0437\u043E\u0441\u043B\u0430\u043D\u0430 \u0432\u0441\u0435\u043C \u0432 \u0433\u0440\u0443\u043F\u043F\u0435 ".concat(groupQuery, "!"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendTask = sendTask;
exports.sendTaskDescription = new commands_1.comDesc("/send_task [group] [time] [description] [discipline]", "отправить задачу участникам группы", 3, "group_name - группа, в которую вы хотите отправить задачу", "time - время в формате \"DD MM YYYY hh:mm\"", "description - содержит описание задачи", "discipline - содержит предмет, по поводу которого срабатывает напоминание. \n    ВАЖНО: При указании предмета, пробелы заменяются нижними подчеркиваниями для успешного парса строки", "Пример: /add_task клан_крутые_гремлины 01 01 2023 15:45 Другое покушать");
