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
exports.callSendedJoinRequests = void 0;
var groups_1 = require("../models/groups");
var users_1 = require("../models/users");
// regular notifications for group admins about new join requests  
function callSendedJoinRequests(bot) {
    return __awaiter(this, void 0, void 0, function () {
        var candidates, admins, _loop_1, _i, _a, admin;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, users_1.userModel.find({ role: "sended" })];
                case 1:
                    candidates = _b.sent();
                    if (!candidates) {
                        return [2 /*return*/];
                    }
                    admins = {};
                    candidates.forEach(function (candidate) { return __awaiter(_this, void 0, void 0, function () {
                        var group;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, groups_1.groupModel.findOne({ groupName: candidate.groupName })];
                                case 1:
                                    group = _a.sent();
                                    if (!admins[group.adminID] || !admins[group.adminID][group.groupName]) {
                                        admins[group.adminID][group.groupName] = [candidate.username];
                                    }
                                    else {
                                        admins[group.adminID][group.groupName].push(candidate.username);
                                    }
                                    candidate.role = "pending";
                                    return [4 /*yield*/, candidate.save()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    _loop_1 = function (admin) {
                        var msg = "Привет! Список жаждущий вступления в ваши группы:";
                        var adminGroups = Object.getOwnPropertyNames(admins[admin]);
                        adminGroups.forEach(function (group) {
                            msg += '\n\n' + group + ':';
                            var candidates = admins[admin][group];
                            var i = 1;
                            candidates.forEach(function (candidate) {
                                msg += '\n' + i.toString() + '. @' + candidate;
                            });
                        });
                        bot.telegram.sendMessage(admin, msg);
                    };
                    for (_i = 0, _a = Object.getOwnPropertyNames(admins); _i < _a.length; _i++) {
                        admin = _a[_i];
                        _loop_1(admin);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.callSendedJoinRequests = callSendedJoinRequests;
