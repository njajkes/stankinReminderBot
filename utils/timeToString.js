"use strict";
exports.__esModule = true;
exports.timeToString = void 0;
function timeToString(time) {
    var date = new Date(time);
    return "".concat(date.getDay() + 1, "/").concat(date.getMonth() + 1, "/").concat(date.getFullYear(), " ").concat(date.getHours(), ":").concat(date.getMinutes());
}
exports.timeToString = timeToString;
