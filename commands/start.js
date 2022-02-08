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
exports.startDescription = exports.start = void 0;
var users_1 = require("../controllers/users");
var comDesc_1 = require("./comDesc");
function start(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, users_1.findUserByUID)(ctx.from.id)];
                case 1:
                    user = _a.sent();
                    if (!!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, users_1.createNewUser)(ctx.from.id, ctx.from.username)];
                case 2:
                    _a.sent();
                    ctx.telegram.sendMessage(ctx.message.chat.id, "\u041F\u0440\u0438\u0432\u0435\u0442!\n\u042D\u0442\u043E \u0442\u0435\u043B\u0435\u0433\u0440\u0430\u043C-\u0431\u043E\u0442 \u0442\u0430\u0441\u043A-\u0442\u0440\u0435\u043A\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432 \u041C\u0413\u0422\u0423 \"\u0421\u0422\u0410\u041D\u041A\u0418\u041D\".\n\u0414\u043B\u044F \u043D\u0430\u0447\u0430\u043B\u0430 \u0440\u0430\u0431\u043E\u0442\u044B \u043D\u0430\u043F\u0438\u0448\u0438 /help \u0434\u043B\u044F \u0432\u044B\u0432\u043E\u0434\u0430 \u043A\u043E\u043C\u0430\u043D\u0434 \u0431\u043E\u0442\u0430.");
                    return [3 /*break*/, 4];
                case 3:
                    ctx.telegram.sendMessage(ctx.message.chat.id, 'И тебе снова привет! Чтобы узнать команды бота, напиши /help');
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.start = start;
exports.startDescription = new comDesc_1.comDesc("/start", "начало работы и приветственное сообщение", 0);
