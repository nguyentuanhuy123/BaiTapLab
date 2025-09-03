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
function tripleNumber2(num) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            setTimeout(() => resolve(num * 3), 1000);
        });
    });
}
function runTask1() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const p141 = yield tripleNumber2(50);
            console.log(p141);
            const p142 = yield tripleNumber2(150);
            console.log(p142);
            const p143 = yield tripleNumber2(250);
            console.log(p143);
            const p144 = yield tripleNumber2(350);
            console.log(p144);
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
runTask1();
