"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    calculateArea() {
        return "area: " + this.width * this.height;
    }
    calculatePerimeter() {
        return "perimeter: " + (this.width + this.height) * 2;
    }
}
exports.Rectangle = Rectangle;
