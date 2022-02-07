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
exports.addModDescription = exports.addMod = void 0;
var groups_1 = require("../../models/groups");
var users_1 = require("../../models/users");
var constants_1 = require("../../utils/constants");
var commands_1 = require("../commands");
function addMod(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var query, group, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = ctx.message.text.split(' ').slice(1);
                    if (query.length != 2) {
                        ctx.telegram.sendMessage(ctx.message.chat.id, constants_1.ARG_LEN_ERR_MESSAGE + "add_mod");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, groups_1.groupModel.findOne({ groupName: query[0], adminID: ctx.from.id })];
                case 1:
                    group = _a.sent();
                    if (!group) {
                        ctx.telegram.sendMessage(ctx.message.chat.id, "Не найдено такой группы, либо вы в ней не админ 🤕");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, users_1.userModel.findOne({ groupName: query[0], username: query[1] })];
                case 2:
                    user = _a.sent();
                    if (!user || user.role == "sended" || user.role == "pending") {
                        ctx.telegram.sendMessage(ctx.message.chat.id, "Такого пользователя в вашей группе нет 🤕\nИспользуйте /show_candidates для того, чтобы посмотреть заявки в группу");
                        return [2 /*return*/];
                    }
                    if (user.role != "member") {
                        ctx.telegram.sendMessage(ctx.message.chat.id, "Этот пользователь уже является модератором, либо админом 🤕");
                        return [2 /*return*/];
                    }
                    user.role = "moderator";
                    return [4 /*yield*/, user.save()];
                case 3:
                    _a.sent();
                    ctx.telegram.sendMessage(ctx.message.chat.id, "Пользователь успешно добавлен в модераторы!");
                    return [2 /*return*/];
            }
        });
    });
}
exports.addMod = addMod;
exports.addModDescription = new commands_1.comDesc("/add_mod [group_name] [username]", "добавить модератора в группу", 2, "group_name - группа, в которую вы хотите добавить модератора", "username - ник пользователя (без \"@\"), которого вы хотите добавить в модераторы", "Пример: /add_mod клан_крутые_гремлины vasya");
