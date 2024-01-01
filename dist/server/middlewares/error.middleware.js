"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.send({ errors: err });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map