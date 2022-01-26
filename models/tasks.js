"use strict";
exports.__esModule = true;
exports.taskModel = exports.taskSchema = void 0;
var auto_increment_1 = require("@typegoose/auto-increment");
var mongoose_1 = require("mongoose");
exports.taskSchema = new mongoose_1.Schema({
    _id: { type: Number },
    uid: { type: Number, required: true },
    discipline: { type: String, required: true },
    time: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true }
});
exports.taskSchema.plugin(auto_increment_1.AutoIncrementID, {});
exports.taskModel = (0, mongoose_1.model)('task', exports.taskSchema);
