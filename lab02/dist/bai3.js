"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p3 = void 0;
var p3 = new Promise(function (_, reject) {
    setTimeout(() => {
        reject("Something went wrong");
    }, 2000);
});
exports.p3 = p3;
p3.catch((err) => {
    console.log("Bai 3:");
    console.log(err);
});
