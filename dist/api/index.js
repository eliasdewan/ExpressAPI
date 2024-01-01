"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const books_controller_1 = __importDefault(require("./books/books.controller"));
const authors_controller_1 = __importDefault(require("./authors/authors.controller"));
const registerRoutes = (apiRouter) => {
    apiRouter.use(books_controller_1.default.router);
    apiRouter.use(authors_controller_1.default.router);
};
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=index.js.map