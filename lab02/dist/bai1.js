"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p1 = void 0;
var p1 = new Promise(function (resolve) {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
exports.p1 = p1;
