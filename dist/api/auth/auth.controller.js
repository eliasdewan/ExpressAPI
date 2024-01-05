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
const express_1 = require("express");
const validation_1 = require("../../common/middlewares/validation");
const auth_service_1 = require("./auth.service");
const register_user_dto_1 = require("./dtos/register-user.dto");
class AuthController {
    constructor() {
        this.apiPrefix = '/auth';
        this.router = (0, express_1.Router)();
        this.intialize();
    }
    registerUser(req, res) {
        const { username, password, profile, email, address } = req.body;
        const payload = {
            username,
            authentication: { password, salt: 'tbc' },
            profile,
            email,
            address
        };
        const result = auth_service_1.authService.register(payload);
        res.send(result);
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(yield auth_service_1.authService.signin(req.body));
        });
    }
    intialize() {
        this.router.post(`${this.apiPrefix}/register`, (0, validation_1.validationMiddleware)(register_user_dto_1.RegisterUserDto), this.registerUser);
        this.router.post(`${this.apiPrefix}/signin`, this.login);
    }
}
const authCtrl = new AuthController();
exports.default = authCtrl;
//# sourceMappingURL=auth.controller.js.map