"use strict";
exports.__esModule = true;
exports.commandDescriptions = exports.commands = void 0;
var start_1 = require("./start");
var help_1 = require("./help");
var groupsList_1 = require("./all/groupsList");
var addTask_1 = require("./task_management/addTask");
var addGroup_1 = require("./all/addGroup");
var addMod_1 = require("./group_management/addMod");
var sendTask_1 = require("./group_management/sendTask");
var showCandidates_1 = require("./group_management/showCandidates");
var acceptJoin_1 = require("./members/acceptJoin");
var groupInfo_1 = require("./members/groupInfo");
var joinGroup_1 = require("./members/joinGroup");
var accept_1 = require("./task_management/accept");
var decline_1 = require("./task_management/decline");
var showTasks_1 = require("./task_management/showTasks");
var setInfo_1 = require("./group_management/description/setInfo");
var delInfo_1 = require("./group_management/description/delInfo");
var about_1 = require("./about");
var delDaily_1 = require("./group_management/daily/delDaily");
var setDaily_1 = require("./group_management/daily/setDaily");
var command = /** @class */ (function () {
    function command(func, name) {
        this.func = func,
            this.name = name;
    }
    return command;
}());
exports.commands = [
    new command(start_1.start, "start"),
    new command(help_1.help, "help"),
    new command(about_1.about, "about"),
    new command(groupsList_1.groupsList, "groups_list"),
    new command(addTask_1.addTask, "add_task"),
    new command(addGroup_1.addGroup, "add_group"),
    new command(joinGroup_1.joinGroup, "join_group"),
    new command(acceptJoin_1.acceptJoin, "accept_join"),
    new command(showCandidates_1.showCandidates, "show_candidates"),
    new command(addMod_1.addMod, "add_mod"),
    new command(accept_1.accept, "accept"),
    new command(decline_1.decline, "decline"),
    new command(sendTask_1.sendTask, "send_task"),
    new command(showTasks_1.showTasks, "show_tasks"),
    new command(groupInfo_1.groupInfo, "group_info"),
    new command(setInfo_1.setInfo, "set_info"),
    new command(delInfo_1.delInfo, "del_info"),
    new command(setDaily_1.setDaily, "set_daily"),
    new command(delDaily_1.delDaily, "del_daily")
];
exports.commandDescriptions = [
    start_1.startDescription,
    help_1.helpDescription,
    about_1.aboutDescription,
    groupsList_1.groupListDescription,
    addTask_1.addTaskDescription,
    addGroup_1.addGroupDescription,
    help_1.helpFlagsDescription,
    joinGroup_1.joinGroupDescription,
    acceptJoin_1.acceptJoinDescription,
    showCandidates_1.showCandidatesDescription,
    addMod_1.addModDescription,
    accept_1.acceptDescription,
    decline_1.declineDescription,
    sendTask_1.sendTaskDescription,
    showTasks_1.showTasksDescription,
    groupInfo_1.groupInfoDescription,
    setInfo_1.setInfoDescription,
    delInfo_1.delInfoDescription,
    setDaily_1.setDailyDescription,
    delDaily_1.delDailyDescription
];
