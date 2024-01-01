"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksService = void 0;
const uuid_1 = require("uuid");
const books_loader_1 = __importDefault(require("../../data/books-loader"));
class BooksService {
    constructor(list) {
        this.books = list;
    }
    getBooks(page, limit) {
        const items = this.books.slice((page - 1) * limit, page * limit);
        const pages = Math.ceil(this.books.length / limit);
        return { success: true, result: { items, pages, page, limit } };
    }
    getBook(id) {
        const book = this.books.find((book) => book.id === id);
        return { success: true, result: book ? book : null };
    }
    addBook(data) {
        const book = Object.assign({ id: (0, uuid_1.v4)() }, data);
        this.books.push(book);
        return {
            success: true,
            message: 'Book added sucessfully',
            result: book
        };
    }
    updateBook(id, payload) {
        const book = this.books.find((book) => book.id === id);
        if (!book) {
            return {
                success: false,
                message: `Book with ${id} not found`,
                result: null
            };
        }
        const index = this.books.findIndex((b) => b.id === id);
        this.books[index] = Object.assign(Object.assign({}, this.books[index]), payload);
        return {
            success: true,
            message: `Book with ${id} updated sucessfully`,
            result: this.books[index]
        };
    }
    removeBook(id) {
        const book = this.books.find((book) => book.id === id);
        if (!book) {
            return {
                success: false,
                message: `Book with ${id} not found`,
                result: null
            };
        }
        this.books = this.books.filter((b) => b.id !== id);
        return {
            success: true,
            message: `Book with ${id} removed sucessfully`,
            result: id
        };
    }
}
exports.booksService = new BooksService(books_loader_1.default);
//# sourceMappingURL=books.service.js.map