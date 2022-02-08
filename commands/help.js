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
exports.help = exports.helpFlagsDescription = exports.helpDescription = void 0;
var comDesc_1 = require("./comDesc");
var commands_1 = require("./commands");
exports.helpDescription = new comDesc_1.comDesc("/help [flag/command]", "все команды и их синтаксис", 0, "flag - необязательный атрибут, подробнее: /help -h", "command - необязательный атрибут, ");
exports.helpFlagsDescription = new comDesc_1.comDesc("/help [flag]", "все команды и их синтаксис", 1, "flag - необязательный атрибут, устанавливает флаг, по которому будут выводиться команды", "Если флаг не был установлен, выводятся команды, доступные всем пользователям", "-h - выводит все флаги :)", "-adm - выводит команды админа группы", "-mod - выводит команды модератора группы");
function help(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var descriptions, perm, result, query, com;
        return __generator(this, function (_a) {
            descriptions = commands_1.commandDescriptions;
            perm = 0;
            query = ctx.update.message.text.split(' ')[1];
            if (query) {
                switch (query) {
                    case '-mod':
                        perm = 3;
                        break;
                    case '-adm':
                        perm = 2;
                        break;
                    case '-h':
                        perm = 1;
                        break;
                    default:
                        com = query;
                }
            }
            result = helpMessageForming(descriptions, perm, com);
            ctx.telegram.sendMessage(ctx.message.chat.id, result);
            return [2 /*return*/];
        });
    });
}
exports.help = help;
function helpMessageForming(commandsDescriptions, permissionLevel, command) {
    var result, i = 1;
    if (command) {
        result = 'Информация по команде:';
        var com = commandsDescriptions.find(function (el) { return el.commandName.slice(1).split(' ')[0] == command; });
        if (com) {
            var commandName = com.commandName, commandDescription = com.commandDescription, args = com.args;
            result += '\n' + commandName + ' — ' + commandDescription;
            if (args.length > 0) {
                args.forEach(function (argument) {
                    result += '\n    ' + argument;
                });
            }
            return result;
        }
    }
    result = 'Список команд: ';
    var descs = commandsDescriptions.filter(function (desc) { return desc.permissions == permissionLevel; });
    descs.forEach(function (description) {
        var commandName = description.commandName, commandDescription = description.commandDescription, args = description.args;
        result += '\n' + i.toString() + '. ' + commandName + ' — ' + commandDescription;
        i++;
    });
    return result;
}
