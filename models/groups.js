"use strict";
exports.__esModule = true;
exports.groupModel = exports.groupSchema = void 0;
var auto_increment_1 = require("@typegoose/auto-increment");
var mongoose_1 = require("mongoose");
exports.groupSchema = new mongoose_1.Schema({
    _id: { type: Number },
    groupName: { type: String, required: true, unique: true },
    tracked: { type: Boolean, required: true },
    fatherName: { type: String },
    adminID: { type: Number, required: true },
    adminUsername: { type: String, required: true },
    description: { type: String },
    contacts: { type: String },
    daily: { type: String }
});
exports.groupSchema.plugin(auto_increment_1.AutoIncrementID, {});
exports.groupModel = (0, mongoose_1.model)("group", exports.groupSchema);
