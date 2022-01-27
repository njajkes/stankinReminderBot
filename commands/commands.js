"use strict";
exports.__esModule = true;
exports.commandDescriptions = exports.commands = void 0;
var start_1 = require("./start");
var help_1 = require("./help");
var groupsList_1 = require("./groupsList");
var addTask_1 = require("./addTask");
var addGroup_1 = require("./addGroup");
var joinGroup_1 = require("./joinGroup");
var acceptJoin_1 = require("./acceptJoin");
var showCandidates_1 = require("./showCandidates");
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
    new command(groupsList_1.groupsList, "groups_list"),
    new command(addTask_1.addTask, "add_task"),
    new command(addGroup_1.addGroup, "add_group"),
    new command(joinGroup_1.joinGroup, "join_group"),
    new command(acceptJoin_1.acceptJoin, "accept_join"),
    new command(showCandidates_1.showCandidates, "show_candidates")
];
exports.commandDescriptions = [
    start_1.startDescription,
    help_1.helpDescription,
    groupsList_1.groupListDescription,
    addTask_1.addTaskDescription,
    addGroup_1.addGroupDescription,
    help_1.helpFlagsDescription,
    joinGroup_1.joinGroupDescription,
    acceptJoin_1.acceptJoinDescription,
    showCandidates_1.showCandidatesDescription,
];
