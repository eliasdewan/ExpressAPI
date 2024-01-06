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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = require("bcrypt");
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: String,
    authentication: {
        password: { type: String, required: true, selected: false },
        lastChanged: { type: Date, selected: false }
    },
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
    }
}, { timestamps: true });
UserSchema.pre('save', function (next) {
    if (this.isModified('authentication.password')) {
        const salt = (0, bcrypt_1.genSaltSync)(10);
        const hash = (0, bcrypt_1.hashSync)(this.authentication.password, salt);
        this.authentication.password = hash;
        this.authentication.lastChanged = new Date();
        return next();
    }
});
UserSchema.methods.generateHash = function (password) {
    const salt = (0, bcrypt_1.genSaltSync)(10);
    return (0, bcrypt_1.hashSync)(password, salt);
};
UserSchema.methods.isPasswordValid = function (password) {
    return (0, bcrypt_1.compareSync)(password, this.authentication.password);
};
UserSchema.statics.userExist = function (username) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ $or: [{ username }, { email: username }] });
    });
};
UserSchema.statics.findUser = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findById(id);
    });
};
UserSchema.statics.searchUsers = function (query) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.find({ 'profile.firstName': { $regex: query, $options: 'i' } });
    });
};
UserSchema.statics.comparePasswords = function (password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, bcrypt_1.compare)(password, hash);
    });
};
UserSchema.virtual('fullName').get(function () {
    return `${this.profile.firstName.trim()} ${this.profile.middleName.trim()} ${this.profile.lastName.trim()}`;
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.schema.js.map