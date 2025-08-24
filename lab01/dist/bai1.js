"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getInfo() {
        return this.name + ": " + this.age;
    }
}
exports.Person = Person;
