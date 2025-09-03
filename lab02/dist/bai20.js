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
function fetchUser3(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const delay = Math.floor(Math.random() * 3000) + 500;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id,
                    name: `User ${id}`,
                    email: `user${id}@example.com`,
                });
            }, delay);
        });
    });
}
function fetchUserWithTimeout(id_1) {
    return __awaiter(this, arguments, void 0, function* (id, timeoutMs = 2000) {
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeoutMs));
        return Promise.race([fetchUser3(id), timeout]);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield fetchUserWithTimeout(1);
        console.log("User fetched:", user);
    }
    catch (error) {
        console.error("Error:", error.message);
    }
}))();
