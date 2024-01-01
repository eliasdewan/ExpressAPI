"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../../common/middlewares/validation");
const book_dto_1 = require("./dtos/book.dto");
const books_service_1 = require("./books.service");
class BooksController {
    constructor() {
        this.apiPrefix = '/books';
        this.router = (0, express_1.Router)();
        this.intialize();
    }
    getAllBooks(req, res) {
        const { page = 1, limit = 3 } = req.query;
        res.send(books_service_1.booksService.getBooks(+page, +limit));
    }
    getBook(req, res) {
        const { id } = req.params;
        res.send(books_service_1.booksService.getBook(id));
    }
    addBook(req, res) {
        const payload = req.body;
        res.send(books_service_1.booksService.addBook(payload));
    }
    updateBook(req, res) {
        const { id } = req.params;
        const payload = req.body;
        res.send(books_service_1.booksService.updateBook(id, payload));
    }
    removeBook(req, res) {
        const { id } = req.params;
        res.send(books_service_1.booksService.removeBook(id));
    }
    intialize() {
        this.router.get(`${this.apiPrefix}`, this.getAllBooks);
        this.router.get(`${this.apiPrefix}/:id`, this.getBook);
        this.router.post(`${this.apiPrefix}`, (0, validation_1.validationMiddleware)(book_dto_1.BookDto), this.addBook);
        this.router.put(`${this.apiPrefix}/:id`, this.updateBook);
        this.router.delete(`${this.apiPrefix}/:id`, this.removeBook);
    }
}
const booksCtrl = new BooksController();
exports.default = booksCtrl;
//# sourceMappingURL=books.controller.js.map