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
function simulateTask7(id, time) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(resolve, time));
        return `Task ${id} finished after ${time} ms`;
    });
}
function queueProcess() {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = [
            () => simulateTask7(1, 1000),
            () => simulateTask7(2, 1500),
            () => simulateTask7(3, 1200),
            () => simulateTask7(4, 800),
            () => simulateTask7(5, 2000),
        ];
        for (const task of tasks) {
            const result = yield task();
            console.log(result);
        }
    });
}
queueProcess();
