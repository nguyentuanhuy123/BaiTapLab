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
function fetchWithRetry(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, retries = 3) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                console.log(`Attempt ${attempt} to fetch ${url}`);
                const response = yield fetch(url);
                const data = yield response.json();
                console.log(data);
                return data;
            }
            catch (error) {
                console.error(`Attempt ${attempt} failed: ${error.message}`);
                if (attempt === retries) {
                    throw new Error(`Failed after ${retries} attempts`);
                }
            }
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3);
    }
    catch (error) {
        console.error(error.message);
    }
}))();
