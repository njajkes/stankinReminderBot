"use strict";
exports.__esModule = true;
exports.timeToString = void 0;
/**
 * Parse ms since 01.01.1970 00:00 to format DD/MM/YYYY hh:mm
 * @param time time like Date.now()
 * @returns string like "DD/MM/YYYY hh:mm"
 */
function timeToString(time) {
    var date = new Date(time);
    return "".concat(date.getDay() + 1, "/").concat(date.getMonth() + 1, "/").concat(date.getFullYear(), " ").concat(date.getHours(), ":").concat(date.getMinutes());
}
exports.timeToString = timeToString;
