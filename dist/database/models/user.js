"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: String,
    profile: {
        firstName: { type: String, required: true },
        middleName: String,
        lastName: { type: String, required: true },
        avatar: String
    },
    address: {
        building: { type: String, required: true },
        street: { type: String, required: true },
        town: { type: String, required: true },
        county: String,
        city: { type: String, required: true },
        postcode: { type: String, required: true }
    },
    authentication: {
        paassword: { type: String, required: true, selected: false },
        salt: { type: String, selected: false }
    }
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map