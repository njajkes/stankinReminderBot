"use strict";
exports.__esModule = true;
exports.userModel = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    uid: { type: Number, required: true },
    groupID: { type: Number, required: true },
    role: { type: String, required: true }
});
exports.userModel = (0, mongoose_1.model)("user", userSchema);
