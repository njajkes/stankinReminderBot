"use strict";
exports.__esModule = true;
exports.counterModel = void 0;
var mongoose_1 = require("mongoose");
var counterSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    count: { type: Number, "default": 0 }
});
exports.counterModel = (0, mongoose_1.model)('counter', counterSchema);
