"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../../common/middlewares/validation");
const author_dto_1 = require("./author.dto");
const authors_service_1 = require("./authors.service");
class AuthorsController {
    constructor() {
        this.apiPrefix = '/authors';
        this.router = (0, express_1.Router)();
        this.intialize();
    }
    getAllAuthors(req, res) {
        res.send(authors_service_1.authorsService.getAuthors());
    }
    getAuthor(req, res) {
        const { id } = req.params;
        res.send(authors_service_1.authorsService.getAuthor(id));
    }
    addAuthor(req, res) {
        const payload = req.body;
        res.send(authors_service_1.authorsService.addAuthor(payload));
    }
    updateAuthor(req, res) {
        const { id } = req.params;
        const payload = req.body;
        res.send(authors_service_1.authorsService.updateAuthor(id, payload));
    }
    removeAuthor(req, res) {
        const { id } = req.params;
        res.send(authors_service_1.authorsService.removeAuthor(id));
    }
    intialize() {
        this.router.get(`${this.apiPrefix}`, this.getAllAuthors);
        this.router.get(`${this.apiPrefix}/:id`, this.getAuthor);
        this.router.post(`${this.apiPrefix}`, (0, validation_1.validationMiddleware)(author_dto_1.AuthorDto), this.addAuthor);
        this.router.put(`${this.apiPrefix}/:id`, this.updateAuthor);
        this.router.delete(`${this.apiPrefix}/:id`, this.removeAuthor);
    }
}
const authorsCtrl = new AuthorsController();
exports.default = authorsCtrl;
//# sourceMappingURL=authors.controller.js.map