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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error.middleware");
const api_1 = require("../api");
const swagger_output_json_1 = __importDefault(require("../swagger-output.json"));
const mongoose_1 = __importDefault(require("mongoose"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config = process.env;
        this.apiRouter = (0, express_1.Router)();
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.static('public'));
        this.app.get('/favicon.ico', (_, res) => res.sendStatus(204));
        this.app.use((req, res, next) => {
            res.setHeader('x-powered-by', 'Roni Book Server');
            next();
        });
        this.app.use(error_middleware_1.errorHandler);
        this.app.use('/api', this.apiRouter);
        (0, api_1.registerRoutes)(this.apiRouter);
        this.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
    }
    start() {
        this.app.listen(this.config.PORT, () => {
            console.log(`${new Date()}: Server is running at http://localhost:${this.config.PORT}`);
            mongoose_1.default
                .connect(this.config.MONGO_URL)
                .then(() => console.log('Database connected.'))
                .catch((error) => console.log(error));
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map