"use strict";
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    bark() {
        console.log('Woof! Woof!');
    }
}
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    meow() {
        console.log('Meow! Meow!');
    }
}
