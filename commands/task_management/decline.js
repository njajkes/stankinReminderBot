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
exports.declineDescription = exports.decline = void 0;
var tasks_1 = require("../../models/tasks");
var commands_1 = require("../commands");
function decline(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var query, task;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = ctx.message.text.split(" ")[1] // task_id
                    ;
                    return [4 /*yield*/, tasks_1.taskModel.findOne({ uid: ctx.from.id, _id: query, status: "w8ing4accept" })];
                case 1:
                    task = _a.sent();
                    if (!task) {
                        ctx.telegram.sendMessage(ctx.message.chat.id, "Задача с таким id, ждущая того, чтобы вы её отклонили, не найдена 🤕");
                        return [2 /*return*/];
                    }
                    task.status = "decline";
                    task.save();
                    ctx.telegram.sendMessage(ctx.message.chat.id, "\u0417\u0430\u0434\u0430\u0447\u0430 ".concat(task._id, " \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u0430!"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.decline = decline;
exports.declineDescription = new commands_1.comDesc("/decline [task_id]", "отклонить задачу, которую вам отправили", 0, "task_id - идентификатор задачи", "Пример: /decline 993");
