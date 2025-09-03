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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
function simulateTask5(time) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(resolve, time));
        return `Task done after ${time} ms`;
    });
}
function runTask4() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const tasks = [
            simulateTask5(1000),
            simulateTask5(2000),
            simulateTask5(1500),
        ];
        console.log("Start tasks with for await...of");
        try {
            for (var _d = true, tasks_1 = __asyncValues(tasks), tasks_1_1; tasks_1_1 = yield tasks_1.next(), _a = tasks_1_1.done, !_a; _d = true) {
                _c = tasks_1_1.value;
                _d = false;
                const result = _c;
                console.log(result);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = tasks_1.return)) yield _b.call(tasks_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log("All tasks finished!");
    });
}
runTask4();
