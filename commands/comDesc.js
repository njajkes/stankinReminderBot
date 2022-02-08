"use strict";
exports.__esModule = true;
exports.comDesc = void 0;
var comDesc = /** @class */ (function () {
    function comDesc(commandName, commandDescription, permissions) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this.commandName = commandName;
        this.commandDescription = commandDescription;
        this.permissions = permissions;
        this.args = args;
    }
    return comDesc;
}());
exports.comDesc = comDesc;
