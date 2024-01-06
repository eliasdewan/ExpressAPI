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
exports.validationMiddleware = void 0;
const validation_pipe_1 = require("../pipes/validation.pipe");
const validationMiddleware = (validationSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, validation_pipe_1.validationPipe)(validationSchema, Object.assign(Object.assign({}, req.body), req.params));
    if (result.length) {
        const formatted = result.map((e) => (Object.assign({ property: e.property }, e.constraints)));
        res.status(400).send({ sucess: false, errors: formatted });
    }
    next();
    return true;
});
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validation.js.map