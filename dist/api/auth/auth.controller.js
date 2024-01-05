"use strict";
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
    intialize() {
        this.router.post(`${this.apiPrefix}/register`, (0, validation_1.validationMiddleware)(register_user_dto_1.RegisterUserDto), this.registerUser);
    }
}
const authCtrl = new AuthController();
exports.default = authCtrl;
//# sourceMappingURL=auth.controller.js.map