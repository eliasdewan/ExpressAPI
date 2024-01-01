"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorsService = void 0;
const uuid_1 = require("uuid");
const authors_loader_1 = __importDefault(require("../../data/authors-loader"));
class AthorsService {
    constructor(list) {
        this.authors = list;
    }
    getAuthors() {
        return { success: true, result: this.authors };
    }
    getAuthor(id) {
        const author = this.authors.find((author) => author.id === id);
        return { success: true, result: author ? author : null };
    }
    addAuthor(data) {
        const author = Object.assign({ id: (0, uuid_1.v4)() }, data);
        this.authors.push(author);
        return {
            success: true,
            message: 'Author added sucessfully',
            result: author
        };
    }
    updateAuthor(id, payload) {
        const author = this.authors.find((author) => author.id === id);
        if (!author) {
            return {
                success: false,
                message: `Author with ${id} not found`,
                result: null
            };
        }
        const index = this.authors.findIndex((b) => b.id === id);
        this.authors[index] = Object.assign(Object.assign({}, this.authors[index]), payload);
        return {
            success: true,
            message: `Author with ${id} updated sucessfully`,
            result: this.authors[index]
        };
    }
    removeAuthor(id) {
        const author = this.authors.find((author) => author.id === id);
        if (!author) {
            return {
                success: false,
                message: `Author with ${id} not found`,
                result: null
            };
        }
        this.authors = this.authors.filter((b) => b.id !== id);
        return {
            success: true,
            message: `Author with ${id} removed sucessfully`,
            result: id
        };
    }
}
exports.authorsService = new AthorsService(authors_loader_1.default);
//# sourceMappingURL=authors.service.js.map