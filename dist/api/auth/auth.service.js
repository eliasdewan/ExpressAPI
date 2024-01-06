"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jwt = __importStar(require("jsonwebtoken"));
const user_schema_1 = require("../../database/models/user.schema");
class AuthService {
    constructor() {
    }
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const usernameTaken = yield user_schema_1.User.userExist(payload.username);
            const emailTaken = yield user_schema_1.User.userExist(payload.email);
            if (!!usernameTaken || !!emailTaken) {
                const reaason = usernameTaken ? 'username' : 'email';
                const reasonVal = usernameTaken ? payload.username : payload.email;
                const errorMessage = `${reaason} ${reasonVal}, already taken, try another option`;
                return { success: false, error: errorMessage };
            }
            try {
                const user = yield user_schema_1.User.create(payload);
                return { success: true, result: user.profile };
            }
            catch (error) {
                console.log(error);
                return { success: true, error: 'user registration failed' };
            }
        });
    }
    signin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { JWT_EXPIRY, JWT_SECRET } = process.env;
            try {
                const user = yield user_schema_1.User.userExist(payload.username);
                if (!user) {
                    return { success: false, status: 401, message: `user ${payload.username} is not recognised` };
                }
                const passwordMatched = yield user_schema_1.User.comparePasswords(payload.password, user.authentication.password);
                if (!passwordMatched) {
                    return { success: false, status: 401, message: `sign in failed please try again` };
                }
                const tokenPayload = Object.assign({ id: user._id, email: user.email }, user.profile);
                const token = jwt.sign(tokenPayload, JWT_SECRET, {
                    expiresIn: JWT_EXPIRY
                });
                return { success: true, token };
            }
            catch (error) {
                console.log(error);
                return { success: true, error: '' };
            }
        });
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map