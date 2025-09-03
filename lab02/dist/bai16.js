"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function simulateTask4(time) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(resolve, time));
        return `Task done after ${time} ms`;
    });
}
function runTask3() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Start parallel tasks...");
        const [result1, result2, result3] = yield Promise.all([
            simulateTask4(1000),
            simulateTask4(2000),
            simulateTask4(1500),
        ]);
        console.log(result1);
        console.log(result2);
        console.log(result3);
    });
}
runTask3();
