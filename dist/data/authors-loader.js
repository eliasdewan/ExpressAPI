"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const authors_json_1 = __importDefault(require("./authors.json"));
const raw = JSON.parse(JSON.stringify(authors_json_1.default)).authors;
exports.default = raw.map((author) => {
    const { first_name, last_name, country, language, died = undefined } = author;
    return { id: (0, uuid_1.v4)(), name: first_name + last_name, country, language, died: died };
});
//# sourceMappingURL=authors-loader.js.map