"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_schema_1 = require("../../database/models/user.schema");
class AuthService {
    constructor() {
    }
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.UserModel.create(payload);
                return { success: true, result: user.profile };
            }
            catch (error) {
                console.log(error);
                return { success: true, error: 'user registration failed' };
            }
        });
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map