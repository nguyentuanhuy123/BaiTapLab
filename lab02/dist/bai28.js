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
function simulateTask6(id, time) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(resolve, time));
        return `Task ${id} finished after ${time} ms`;
    });
}
function batchProcess() {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = [
            simulateTask6(1, 1000),
            simulateTask6(2, 1500),
            simulateTask6(3, 2000),
            simulateTask6(4, 1200),
            simulateTask6(5, 1800),
        ];
        const results = yield Promise.all(tasks);
        results.forEach((result) => console.log(result));
    });
}
batchProcess();
