"use strict";
exports.__esModule = true;
exports.groupModel = exports.groupSchema = void 0;
var mongoose_1 = require("mongoose");
exports.groupSchema = new mongoose_1.Schema({
    groupID: { type: Number, required: true },
    groupName: { type: String, required: true },
    tracked: { type: Boolean, required: true },
    fatherName: { type: String },
    adminID: { type: Number, required: true },
    adminUsername: { type: String, required: true }
});
exports.groupModel = (0, mongoose_1.model)("group", exports.groupSchema);
