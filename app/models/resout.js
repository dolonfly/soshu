"use strict";

function Resout(code, data) {
    this.code = code;
    this.data = data;
    this.message = null;
}

Resout.prototype.updateMessage = function (message) {
    this.message = message;
};

Resout.prototype.serialize = function () {
    return {
        code: this.code,
        message: this.message,
        data: this.data
    }
};

module.exports = Resout;
