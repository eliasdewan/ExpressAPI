"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const books_json_1 = __importDefault(require("./books.json"));
const raw = JSON.parse(JSON.stringify(books_json_1.default)).books;
exports.default = raw.map((b) => {
    const { isbn, title, author, pages, language, country, published, publisher, description, website } = b;
    return { id: (0, uuid_1.v4)(), isbn, title, author, pages, language, country, published, publisher, description, website };
});
//# sourceMappingURL=books-loader.js.map