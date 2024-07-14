"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = exports.signupSchema = exports.signinSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signinSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6, { message: "Password must be atleast 6 characters long" }),
    name: zod_1.default.string().optional(),
});
exports.signupSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6, { message: "Password must be atleast 6 characters long" }),
});
exports.createBlogSchema = zod_1.default.object({
    title: zod_1.default.string().min(3, { message: "Title must be atleast 3 characters long" }),
    content: zod_1.default.string().min(10, { message: "Content must be atleast 10 characters long" }),
});
exports.updateBlogSchema = zod_1.default.object({
    title: zod_1.default.string().min(3, { message: "Title must be atleast 3 characters long" }),
    content: zod_1.default.string().min(10, { message: "Content must be atleast 10 characters long" }),
    id: zod_1.default.string().uuid(),
});
