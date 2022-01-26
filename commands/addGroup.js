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
exports.addGroupDescription = exports.addGroup = void 0;
var groups_1 = require("../controllers/groups");
var groups_2 = require("../models/groups");
var commandDescription_1 = require("./commandDescription");
function addGroup(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var query, tracked, groupName, gnameCheck;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = ctx.update.message.text
                        .split(' ').slice(1);
                    if (query.length != 2) {
                        ctx.telegram.sendMessage(ctx.message.chat.id, "Некорректное количество параметров 🤕\nПожалуйта, введите данные по форме. Подробнее: /help add_group");
                        return [2 /*return*/];
                    }
                    tracked = +query[query.length - 1];
                    if (isNaN(tracked)) {
                        ctx.telegram.sendMessage(ctx.message.chat.id, "В качестве последнего параметра введено не число 🤕\nПожалуйта, введите данные по форме. Подробнее: /help add_group");
                        return [2 /*return*/];
                    }
                    groupName = query.slice(0, query.length - 1).join(' ');
                    gnameCheck = groups_2.groupModel.findOne({ groupName: groupName });
                    if (gnameCheck) {
                        ctx.telegram.sendMessage(ctx.message.chat.id, "К сожалению, такая группа уже существует 🤕\nПопробуйте использовать другое название!");
                    }
                    return [4 /*yield*/, (0, groups_1.createGroup)(groupName, !!tracked, ctx.from)];
                case 1:
                    _a.sent();
                    ctx.telegram.sendMessage(ctx.message.chat.id, "Группа была успешно добавлена!\n");
                    return [2 /*return*/];
            }
        });
    });
}
exports.addGroup = addGroup;
exports.addGroupDescription = new commandDescription_1.comDesc("/add_group [group_name] [tracked]", "добавление группы", 0, "group_name - название группы (1 слово без пробелов)", "tracked - будет ли группа отображаться в общем списке групп (0 или 1)", "Пример: /add_group клан_крутые_гремлины 0");
