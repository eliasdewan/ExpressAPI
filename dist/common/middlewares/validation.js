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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const validation_pipe_1 = require("../pipes/validation.pipe");
const logger_1 = __importDefault(require("../logging/logger"));
const validationMiddleware = (validationSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, validation_pipe_1.validationPipe)(validationSchema, Object.assign(Object.assign({}, req.body), req.params));
    if (result.length) {
        const formatted = result.map((e) => (Object.assign({ property: e.property }, e.constraints)));
        logger_1.default.error('Bad Request: validation failed on payload');
        return res.status(400).send({ sucess: false, errors: formatted });
    }
    next();
});
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validation.js.map