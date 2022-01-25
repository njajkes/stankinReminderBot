"use strict";
exports.__esModule = true;
exports.comDesc = void 0;
var comDesc = /** @class */ (function () {
    function comDesc(commandName, commandDescription) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.commandName = commandName;
        this.commandDescription = commandDescription;
        this.args = args;
    }
    return comDesc;
}());
exports.comDesc = comDesc;
