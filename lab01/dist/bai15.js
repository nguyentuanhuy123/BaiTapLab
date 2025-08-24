"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = exports.User = exports.Book = void 0;
class Book {
    constructor(ten) {
        this.ten = ten;
    }
}
exports.Book = Book;
class User {
    constructor(id) {
        this.id = id;
    }
}
exports.User = User;
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(book) {
        this.books.push(book);
        console.log(`Sach "${book.ten}" duoc them vao thu vien`);
    }
}
exports.Library = Library;
