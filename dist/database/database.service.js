"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class DatabaseService {
    constructor(url) {
        this.connect(url);
    }
    connect(url) {
        mongoose_1.default
            .connect(url)
            .then(() => console.log('Database connected.'))
            .catch((error) => console.log(error));
    }
}
exports.default = DatabaseService;
//# sourceMappingURL=database.service.js.map