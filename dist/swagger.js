"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const swaggerAutogenInstance = (0, swagger_autogen_1.default)({ openapi: '3.0.0' });
const swaggerDoc = {
    info: {
        version: 'v1.0.0',
        title: 'Books API',
        description: 'Books API document with Swagger and Typescript'
    }
};
const outputFile = './swagger-output.json';
const endPointFiles = ['./api/index.js'];
swaggerAutogenInstance(outputFile, endPointFiles, swaggerDoc);
//# sourceMappingURL=swagger.js.map