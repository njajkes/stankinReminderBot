"use strict";
exports.__esModule = true;
exports.commands = void 0;
var start_1 = require("./start");
var help_1 = require("./help");
var groupsList_1 = require("./groupsList");
var addTask_1 = require("./addTask");
var addGroup_1 = require("./addGroup");
exports.commands = {
    start: start_1.start,
    help: help_1.help,
    groupsList: groupsList_1.groupsList,
    addTask: addTask_1.addTask,
    addGroup: addGroup_1.addGroup
};
