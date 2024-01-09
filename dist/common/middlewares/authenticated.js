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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    const authHedeader = req.header('Authorization');
    if (!authHedeader || !authHedeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Invalid or no authorizatioon.' });
    }
    const token = authHedeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ success: false, message: 'Missing aut token' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: 'Invalid auth token' });
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authenticated.js.map