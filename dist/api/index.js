"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const books_controller_1 = __importDefault(require("./books/books.controller"));
const authors_controller_1 = __importDefault(require("./authors/authors.controller"));
const auth_controller_1 = __importDefault(require("./auth/auth.controller"));
const accounts_controller_1 = __importDefault(require("./accounts/accounts.controller"));
const verify_auth_1 = require("../common/middlewares/verify-auth");
const registerRoutes = (apiRouter) => {
    apiRouter.use(auth_controller_1.default.router);
    apiRouter.use(books_controller_1.default.router, verify_auth_1.verifyAuth);
    apiRouter.use(authors_controller_1.default.router, verify_auth_1.verifyAuth);
    apiRouter.use(accounts_controller_1.default.router, verify_auth_1.verifyAuth);
};
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=index.js.map