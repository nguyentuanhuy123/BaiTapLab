"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumber10 = void 0;
var getNumber10 = new Promise(function (resolve) {
    setTimeout(() => {
        resolve(10);
    }, 1000);
});
exports.getNumber10 = getNumber10;
