"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = exports.Square = void 0;
class Shape {
}
class Square extends Shape {
    constructor(canh) {
        super();
        this.canh = canh;
    }
    area() {
        return this.canh * this.canh;
    }
}
exports.Square = Square;
class Circle extends Shape {
    constructor(duongkinh) {
        super();
        this.duongkinh = duongkinh;
    }
    area() {
        return Math.PI * this.duongkinh * this.duongkinh;
    }
}
exports.Circle = Circle;
